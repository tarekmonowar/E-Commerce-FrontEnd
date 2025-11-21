import { useState } from "react";

export default function DemoPaymentToaster() {
  const [show, setShow] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 1200); // hide after 1.2s
  };

  if (!show) return null;

  return (
    <div
      className="
        fixed bottom-30 right-5 max-w-xs bg-gradient-to-r from-[#44a347] to-[#24640a] text-white
        rounded-sm p-4 z-[9999] animate-slideUp
      "
    >
      <button
        onClick={() => setShow(false)}
        className="
          absolute top-4 right-4 text-yellow-300 hover:text-yellow-500
          text-lg cursor-pointer
        "
      >
        ✕
      </button>

      <h3 className="font-bold text-white text-lg">Use these Stripe card:</h3>

      <p className="text-sm text-gray-700 mt-1 mb-1"></p>

      <div className=" mt-2">
        <p
          onClick={() => handleCopy("4242 4242 4242 4242")}
          className="rounded border relative border-white bg-transparent text-black text-xs md:text-base font-semibold py-1 px-4 tracking-wider uppercase transition-transform duration-75 hover:bg-gradient-to-r hover:from-[#24640a] hover:to-[#44a347] hover:text-white focus:outline-none cursor-pointer"
        >
          <strong>Card:</strong> 4242 4242 4242 4242
          {copied && (
            <span className="absolute -top-4 left-20 text-xs text-yellow-200 animate-pulse">
              Copied!
            </span>
          )}
        </p>
        <div className="flex gap-2 justify-between mt-2">
          <p
            onClick={() => handleCopy("10/30")}
            className="rounded border border-white bg-transparent text-black text-xs md:text-base font-semibold py-1 px-4 tracking-wider uppercase transition-transform duration-75 hover:bg-gradient-to-r hover:from-[#24640a] hover:to-[#44a347] hover:text-white focus:outline-none cursor-pointer"
          >
            <strong>Expiry:</strong> 10/30
          </p>
          <p
            onClick={() => handleCopy("333")}
            className="rounded border border-white bg-transparent text-black text-xs md:text-base font-semibold py-1 px-4 tracking-wider uppercase transition-transform duration-75 hover:bg-gradient-to-r hover:from-[#24640a] hover:to-[#44a347] hover:text-white focus:outline-none cursor-pointer"
          >
            <strong>CVC:</strong> 333
          </p>
        </div>
      </div>

      <p className="text-xs text-white mt-3">
        Test mode only — no real money charged.
      </p>
    </div>
  );
}
