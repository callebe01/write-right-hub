import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import sageAvatar from "@/assets/sage-avatar.png";

interface Message {
  id: number;
  sender: "sage" | "student";
  text: string;
  timestamp: Date;
}

interface SageChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
}

const SageChat = ({ messages, onSendMessage, isTyping = false }: SageChatProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Progressive disclosure: shrink avatar after conversation starts
  const hasConversationStarted = messages.length > 1;

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
    <div className="h-full bg-spark-card-bg border-[4px] border-spark-card-border rounded-[26px] flex flex-col">
      <div className="flex flex-col h-full p-6 gap-4">
        {/* Sage Avatar - Adaptive Size */}
        <div className="flex justify-center">
          <div
            className={`bg-[#2a4a4e] rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ${
              hasConversationStarted ? 'w-[80px] h-[80px]' : 'w-[146px] h-[146px]'
            }`}
          >
            <img
              src={sageAvatar}
              alt="Sage"
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
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

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex flex-col gap-1.5 max-w-[90%]">
                <p className="text-spark-yellow text-sm font-medium">Sage</p>
                <div className="px-4 py-3 rounded-lg bg-spark-card-bg border border-white/10 rounded-tl-none">
                  <div className="flex gap-1.5">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-2 h-2 bg-spark-yellow rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 bg-spark-yellow rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 bg-spark-yellow rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

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
          <motion.button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            whileHover={{ scale: inputValue.trim() ? 1.1 : 1 }}
            whileTap={{ scale: inputValue.trim() ? 0.9 : 1 }}
            className="bg-spark-progress-bg hover:bg-spark-yellow/20 p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SageChat;
