import React, { useState, useRef, useEffect } from 'react';

interface ChatbotWidgetProps {
  isOpen: boolean;
  messages: { text: string; sender: 'user' | 'ai' }[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isTyping: boolean;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  isOpen,
  messages,
  onSendMessage,
  onClose,
  isTyping,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm md:max-w-md bg-white rounded-xl shadow-2xl flex flex-col h-[70vh] md:h-[80vh]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#E94E3C] text-white rounded-t-xl">
        <h3 className="text-lg font-bold">SmartPantry AI Assistant</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close chatbot"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm shadow ${
                msg.sender === 'user'
                  ? 'bg-[#F5C16C] text-gray-900 rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-2 rounded-lg text-sm shadow bg-gray-100 text-gray-800 rounded-bl-none">
              <span className="animate-pulse">AI is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isTyping ? "Please wait for a response..." : "Ask me anything..."}
          className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#F5C16C] focus:border-transparent transition"
          disabled={isTyping}
          aria-label="Chat input"
        />
        <button
          type="submit"
          className="bg-[#E94E3C] text-white p-3 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isTyping || !inputValue.trim()}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatbotWidget;