import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import mascotImage from "@/assets/mascot-hero.png";

interface Message {
  id: number;
  sender: "sage" | "student";
  text: string;
  timestamp: Date;
}

interface SageChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const SageChat = ({ messages, onSendMessage }: SageChatProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full bg-spark-card-bg border-[7px] border-spark-card-border rounded-[26px] flex flex-col">
      <div className="flex flex-col h-full p-9 gap-5">
        {/* Sage Avatar */}
        <div className="flex justify-center">
          <div className="w-[146px] h-[146px] bg-[#95c498] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={mascotImage}
              alt="Sage"
              className="w-full h-full object-cover scale-150"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "student" ? "justify-end pl-8" : "justify-start"}`}
            >
              <div className="flex flex-col gap-1.5 max-w-[90%]">
                {/* Sender Name */}
                {message.sender === "sage" && (
                  <p className="text-spark-yellow text-sm font-medium">Sage</p>
                )}

                {/* Message Bubble */}
                <div
                  className={`px-3 py-2 rounded-lg ${
                    message.sender === "sage"
                      ? "bg-spark-card-bg border border-white/10 rounded-tl-none"
                      : "bg-spark-main-bg rounded-tr-none shadow-[4px_4px_0px_0px_#000000]"
                  }`}
                >
                  <p className="text-white text-base leading-6">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message"
            className="flex-1 bg-spark-progress-bg border border-spark-progress-bg rounded-lg px-3.5 py-2.5 text-white text-base placeholder:text-white/60 outline-none focus:border-spark-yellow/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-spark-progress-bg hover:bg-spark-yellow/20 p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SageChat;
