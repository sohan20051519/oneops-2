import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, PaperAirplaneIcon, XIcon } from './icons/Icons';
import { getAiChatResponse } from '../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hi there! I'm the OneOps AI Assistant. How can I help you with your deployments today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
      if(isOpen) {
        scrollToBottom();
      }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getAiChatResponse(input);
    const aiMessage: Message = { sender: 'ai', text: aiResponse };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-hover hover:scale-110 transition-all duration-300"
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        >
          {isOpen ? <XIcon className="h-8 w-8" /> : <ChatIcon className="h-8 w-8" />}
        </button>
      </div>

      {isOpen && (
        <div 
        className="fixed z-50 inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[90vw] sm:max-w-md sm:h-[70vh] sm:max-h-[600px] bg-white sm:rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-chat-header"
        >
          <header className="bg-gray-100 p-4 border-b flex justify-between items-center">
            <h3 id="ai-chat-header" className="font-bold text-gray-800">OneOps AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="sm:hidden text-gray-600 hover:text-gray-900" aria-label="Close chat">
                <XIcon className="h-6 w-6"/>
            </button>
          </header>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-lg'
                        : 'bg-gray-200 text-gray-800 rounded-bl-lg'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-lg px-4 py-3">
                        <div className="flex items-center space-x-1">
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-primary text-white rounded-lg disabled:bg-gray-300"
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="h-6 w-6 transform rotate-45" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChat;