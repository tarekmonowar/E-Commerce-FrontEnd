import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  streaming?: boolean;
}

const DEFAULT_QUESTIONS = [
  "Who created this website ?",
  "What features does this website have?",
  "What technologies are used ?",
];

/**
 * Pick how many characters to reveal per animation frame based on how far
 * the displayed text is behind the buffered text. This is what makes the
 * stream feel smooth like ChatGPT/Gemini even when the network sends
 * tokens in big bursts.
 */
const charsPerFrame = (backlog: number) => {
  if (backlog <= 0) return 0;
  if (backlog < 40) return 1; // tiny backlog -> classic typewriter feel
  if (backlog < 120) return 2;
  if (backlog < 240) return 4;
  if (backlog < 500) return 7;
  return 12; // huge backlog -> catch up fast so user doesn't wait
};

const WELCOME_STORAGE_KEY = "tm-ai-welcome-seen";

const PILL_PHRASES = ["Need help?", "Ask AI", "Chat now"];
const PILL_INTERVAL_MS = 2400;

export function AIChatMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [pillIdx, setPillIdx] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cycle the rotating "Need help? / Ask AI / Chat now" pill while chat is closed
  useEffect(() => {
    if (isOpen) return;
    const timer = window.setInterval(() => {
      setPillIdx((i) => (i + 1) % PILL_PHRASES.length);
    }, PILL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  // Show the "Need help?" bubble once on a user's first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(WELCOME_STORAGE_KEY);
    if (seen) return;
    const showTimer = window.setTimeout(() => setShowWelcome(true), 1500);
    return () => window.clearTimeout(showTimer);
  }, []);

  // Auto-dismiss the welcome bubble after a while so it doesn't linger forever
  useEffect(() => {
    if (!showWelcome) return;
    const hideTimer = window.setTimeout(() => {
      setShowWelcome(false);
      window.localStorage.setItem(WELCOME_STORAGE_KEY, "1");
    }, 12000);
    return () => window.clearTimeout(hideTimer);
  }, [showWelcome]);

  const dismissWelcome = useCallback(() => {
    setShowWelcome(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(WELCOME_STORAGE_KEY, "1");
    }
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    dismissWelcome();
  }, [dismissWelcome]);

  // Smooth-stream refs (one active stream at a time is enough for this widget)
  const bufferRef = useRef<string>(""); // full text received from network so far
  const displayedLenRef = useRef<number>(0); // chars currently shown in UI
  const streamDoneRef = useRef<boolean>(false); // network finished?
  const rafRef = useRef<number | null>(null);
  const activeAiIdRef = useRef<string | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /** Animation loop: gradually reveal characters from buffer to UI. */
  const tick = useCallback(() => {
    const aiId = activeAiIdRef.current;
    if (!aiId) {
      rafRef.current = null;
      return;
    }

    const backlog = bufferRef.current.length - displayedLenRef.current;
    const step = charsPerFrame(backlog);

    if (step > 0) {
      displayedLenRef.current = Math.min(
        displayedLenRef.current + step,
        bufferRef.current.length,
      );

      const visible = bufferRef.current.slice(0, displayedLenRef.current);

      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === aiId);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], content: visible, streaming: true };
        return updated;
      });
    }

    const caughtUp =
      displayedLenRef.current >= bufferRef.current.length &&
      streamDoneRef.current;

    if (caughtUp) {
      // Finalize: drop the streaming flag so the cursor disappears
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === aiId);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], streaming: false };
        return updated;
      });
      activeAiIdRef.current = null;
      rafRef.current = null;
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startTickIfIdle = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const sendToAI = async (userMessage: string) => {
    // Reset stream state for this turn
    bufferRef.current = "";
    displayedLenRef.current = 0;
    streamDoneRef.current = false;

    try {
      setIsTyping(true);

      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error("AI connect error");
      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const aiId = Date.now().toString();
      activeAiIdRef.current = aiId;

      // Insert empty AI bubble — content will be filled by the tick loop
      setMessages((prev) => [
        ...prev,
        {
          id: aiId,
          content: "",
          sender: "ai",
          timestamp: new Date(),
          streaming: true,
        },
      ]);

      // Hide the "thinking" indicator as soon as we know the request is live;
      // the bubble itself shows the streaming cursor from here on.
      setIsTyping(false);

      // Kick off the reveal animation
      startTickIfIdle();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bufferRef.current += decoder.decode(value, { stream: true });
        startTickIfIdle();
      }

      streamDoneRef.current = true;
      startTickIfIdle();
    } catch (err) {
      console.log(err);
      streamDoneRef.current = true;
      activeAiIdRef.current = null;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Error: AI service is unavailable.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    sendToAI(content);
  };

  const handleDefaultQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end gap-2 sm:gap-3">
          {/* First-visit welcome bubble (or rotating pill once dismissed) */}
          {showWelcome ? (
            <div
              role="button"
              tabIndex={0}
              onClick={openChat}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openChat();
              }}
              className="tm-ai-bubble-in relative mb-3 max-w-[200px] sm:max-w-[230px] cursor-pointer rounded-2xl rounded-br-sm bg-white px-3 sm:px-4 py-2.5 sm:py-3 shadow-xl border border-green-100 hover:shadow-2xl transition-shadow"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissWelcome();
                }}
                aria-label="Dismiss"
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-white shadow hover:bg-gray-500 transition-colors"
              >
                <X className="h-3 w-3" strokeWidth={3} />
              </button>

              <div className="flex items-center gap-2">
                <Sparkles
                  className="h-4 w-4 text-[#2C742F] tm-ai-sparkle shrink-0"
                  strokeWidth={2.5}
                />
                <p className="text-sm font-semibold tm-ai-shimmer">
                  Need help?
                </p>
              </div>
              <p className="mt-1 text-xs text-gray-700">
                Ask the{" "}
                <span className="font-semibold text-[#2C742F]">
                  TM AI Assistant
                </span>{" "}
                — anything about this site.
              </p>
              <p className="mt-1 text-[10px] text-gray-400">
                Click to start chatting →
              </p>

              {/* Tail pointing toward the chat icon */}
              <span className="absolute -right-1.5 bottom-4 h-3 w-3 rotate-45 border-t border-r border-green-100 bg-white" />
            </div>
          ) : (
            <button
              type="button"
              onClick={openChat}
              aria-label="Open AI chat"
              className="tm-ai-bubble-in relative mb-3 flex items-center gap-1.5 rounded-full bg-white pl-2.5 pr-3 py-1.5 shadow-md border border-green-100 hover:shadow-lg hover:scale-[1.04] transition-all cursor-pointer"
            >
              <Sparkles
                className="h-3.5 w-3.5 text-[#2C742F] tm-ai-sparkle shrink-0"
                strokeWidth={2.8}
              />
              <span
                key={pillIdx}
                className="tm-ai-text-pop inline-block min-w-[68px] text-center text-[12px] font-bold text-[#2C742F] whitespace-nowrap"
              >
                {PILL_PHRASES[pillIdx]}
              </span>
              {/* Tail */}
              <span className="absolute -right-1 bottom-3 h-2.5 w-2.5 rotate-45 border-t border-r border-green-100 bg-white" />
            </button>
          )}

          {/* Floating chat button with layered animations */}
          <div className="relative tm-ai-float">
            {/* Rotating conic-gradient halo behind the button */}
            {/* <span
              aria-hidden
              className="tm-ai-spin-slow absolute -inset-[3px] rounded-full opacity-70 blur-[1px]"
              style={{
                background:
                  "conic-gradient(from 0deg, #2C742F, #1fbd61, #a7f3d0, #2C742F)",
              }}
            /> */}

            {/* Two staggered pulse rings */}
            <span
              aria-hidden
              className="tm-ai-ring absolute inset-0 rounded-full bg-[#2C742F]/40"
            />
            <span
              aria-hidden
              className="tm-ai-ring absolute inset-0 rounded-full bg-[#1fbd61]/40"
              style={{ animationDelay: "1.2s" }}
            />

            <Button
              onClick={openChat}
              aria-label="Open AI chat"
              className="relative h-12 w-12 sm:h-14 sm:w-14 xl:h-16 xl:w-16 rounded-full bg-gradient-to-br from-[#2C742F] to-[#1fbd61] hover:from-[#1fbd61] hover:to-[#2C742F]  hover:shadow-2xl transition-transform duration-300 hover:scale-110 hover:-rotate-6 cursor-pointer"
            >
              <MessageCircle
                className="!h-5 !w-5 sm:!h-6 sm:!w-6 text-white"
                strokeWidth={2.5}
              />
            </Button>

            {/* Live online dot (ping + steady) */}
            <span
              aria-hidden
              className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-ping"
            />
            <span
              aria-hidden
              className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"
            />
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-50 bg-slate-100 chat-shadow animate-slide-up overflow-hidden flex flex-col rounded-xl shadow-2xl
            top-3 right-3 bottom-3 left-3
            sm:top-auto sm:left-auto sm:bottom-6 sm:right-6
            sm:w-[380px] sm:h-[600px] sm:max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-800 via-green-900 to-slate-900 p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  AI Assistant
                </h3>
                <p className="text-white/80 text-[11px] sm:text-xs truncate">
                  Online • Typically replies instantly
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white rounded-full cursor-pointer bg-white/20 hover:bg-white/30 shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 sm:space-y-4 bg-slate-100">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="bg-gray-300  rounded-sm p-4 max-w-[85%]">
                  <p className="text-sm text-black">
                    👋 Hi! I'm your AI assistant. How can I help you today?
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-black/80 px-1">Quick questions:</p>
                  {DEFAULT_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleDefaultQuestion(question)}
                      className="block w-full text-left bg-white/60 hover:bg-white/50 border border-gray-300 rounded-xl p-3 text-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex animate-fade-in",
                  message.sender === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl p-4 max-w-[85%] shadow-sm",
                    message.sender === "user"
                      ? "bg-slate-700 text-white rounded-sm"
                      : "bg-gray-300 text-black rounded-sm wrap-break-word",
                  )}
                >
                  {message.sender === "user" ? (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  ) : (
                    <div className="text-sm leading-relaxed ai-markdown">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 whitespace-pre-wrap">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 mb-2 space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 mb-2 space-y-1">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-snug">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-black">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic">{children}</em>
                          ),
                          h1: ({ children }) => (
                            <h3 className="text-base font-semibold mb-1 mt-2">
                              {children}
                            </h3>
                          ),
                          h2: ({ children }) => (
                            <h3 className="text-base font-semibold mb-1 mt-2">
                              {children}
                            </h3>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-sm font-semibold mb-1 mt-2">
                              {children}
                            </h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="text-sm font-semibold mb-1 mt-2">
                              {children}
                            </h4>
                          ),
                          code: ({ children, className }) => {
                            const text = String(children ?? "");
                            const isBlock =
                              text.includes("\n") ||
                              /language-/.test(className ?? "");
                            return isBlock ? (
                              <code className="font-mono text-[12px] block">
                                {children}
                              </code>
                            ) : (
                              <code className="bg-white/70 text-[#2C742F] px-1 py-0.5 rounded text-[12px] font-mono">
                                {children}
                              </code>
                            );
                          },
                          pre: ({ children }) => (
                            <pre className="bg-white/70 rounded-md p-2 my-2 overflow-x-auto text-[12px] leading-snug">
                              {children}
                            </pre>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2C742F] underline break-all"
                            >
                              {children}
                            </a>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-2 border-[#2C742F] pl-2 italic text-gray-700 my-2">
                              {children}
                            </blockquote>
                          ),
                          hr: () => <hr className="my-2 border-gray-400/60" />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                      {message.streaming && (
                        <span className="inline-block w-[7px] h-[14px] align-[-2px] bg-[#2C742F] ml-0.5 animate-pulse rounded-[1px]" />
                      )}
                    </div>
                  )}
                  <div className="flex justify-between mt-1">
                    <p
                      className={cn(
                        "text-xs",
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-gray-500",
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {message.sender === "ai" && (
                      <span className="text-xs text-[#2C742F]">From TM AI</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-chat-ai-bg rounded-2xl rounded-tl-sm p-3 max-w-[85%] flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-b-fuchsia-700 border-e-teal-600 border-l-indigo-500 border-t-red-700 rounded-full animate-spin"></div>

                  <span className="text-sm font-medium text-muted-foreground">
                    TM AI Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-300">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-0 focus-visible:ring-[#2C742F] !text-black !bg-slate-200 focus-visible:ring-2 focus-visible:ring-offset-0 text-sm"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="rounded-full bg-[#2C742F] hover:bg-[#3aa837] h-10 w-10 shrink-0 cursor-pointer text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
