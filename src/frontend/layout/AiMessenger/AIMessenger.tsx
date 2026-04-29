import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const DEFAULT_QUESTIONS = [
  "Who created this website ?",
  "What features does this website have?",
  "What technologies are used ?",
];

export function AIChatMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToAI = async (userMessage: string) => {
    try {
      setIsTyping(true);

      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.body) throw new Error("No stream");
      if (!res.ok) {
        throw new Error("AI connect error");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const aiId = Date.now().toString();

      // create empty AI message first
      setMessages((prev) => [
        ...prev,
        {
          id: aiId,
          content: "",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);

      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        // live update UI
        setMessages((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((m) => m.id === aiId);

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              content: fullText,
            };
          }

          scrollToBottom();

          return updated;
        });
      }
    } catch (err) {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: "Error: AI service is unavailable.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      console.log(err);
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
      {/* Chat Button */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative animate-fade-in">
            
            <Button
              onClick={() => setIsOpen(true)}
              className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#2C742F] to-[#1fbd61] hover:from-[#1fbd61] hover:to-[#2C742F]
        shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <MessageCircle
                className="!h-6 !w-6 text-white"
                strokeWidth={2.5}
              />
            </Button>
          </div>
        )}
      </div> */}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <div className="relative animate-fade-in flex flex-col items-end">
            {/* Tooltip / label */}
            {/* <div className="mb-2 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-medium shadow-lg animate-bounce">
              TM AI Messenger
            </div> */}

            {/* Chat Icon Button */}
            <Button
              onClick={() => setIsOpen(true)}
              className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#2C742F] to-[#1fbd61] hover:from-[#1fbd61] hover:to-[#2C742F]
        shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce"
            >
              <MessageCircle
                className="!h-6 !w-6 text-white"
                strokeWidth={2.5}
              />
            </Button>

            {/* Small notification dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-slate-100 rounded-xl shadow-2xl chat-shadow animate-slide-up overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#2C742F] to-[#1fbd61] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <p className="text-white/80 text-xs">
                  Online • Typically replies instantly
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white rounded-full cursor-pointer bg-white/20  hover:bg-white/30"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-slate-100">
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
                    "rounded-2xl p-4 max-w-[80%] shadow-sm",
                    message.sender === "user"
                      ? "bg-[#2C742F] text-white rounded-sm"
                      : "bg-gray-300 text-black rounded-sm wrap-break-word",
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex justify-between">
                    <p
                      className={cn(
                        "text-xs mt-1",
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
                      <span className="text-xs mt-1 text-[#2C742F]">
                        {" "}
                        From TM AI
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-chat-ai-bg rounded-2xl rounded-tl-sm p-3 max-w-[85%] flex items-center gap-3">
                  {/* Spinning icon */}
                  <div className="w-5 h-5 border-2 border-b-fuchsia-700 border-e-teal-600 border-l-indigo-500 border-t-red-700 rounded-full animate-spin"></div>

                  {/* Text */}
                  <span className="text-sm font-medium text-muted-foreground">
                    TM AI Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-300">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-0 focus-visible:ring-[#2C742F] !text-black !bg-slate-200 focus-visible:ring-2 focus-visible:ring-offset-0"
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
