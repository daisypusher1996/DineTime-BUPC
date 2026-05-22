
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, Sparkles, ChevronDown } from 'lucide-react';
import { ChatMessage, MenuItem, Stall } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatBotProps {
  menuItems: MenuItem[];
  stalls: Stall[];
}

export const ChatBot: React.FC<ChatBotProps> = ({ menuItems, stalls }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Maayong adlaw! I\'m **DineBot**. Ask me for a Bicolano reco or budget meals at BUPC!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: input, 
      timestamp: new Date() 
    };
    
    // Prepare history: exclude the welcome message to ensure AI history starts with a 'user' turn
    const historyForAi = messages
      .filter(m => m.id !== 'welcome')
      .map(m => ({ role: m.role, text: m.text }));

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    
    try {
      const responseText = await sendMessageToGemini(currentInput, historyForAi, menuItems, stalls);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: responseText, 
        timestamp: new Date() 
      }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="text-[#FF671F] font-black">{part.slice(2, -2)}</strong>;
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:w-80 z-[100] pointer-events-none">
      <AnimatePresence>
        {!isOpen && (
          <div className="flex justify-end pointer-events-auto">
              <motion.button
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="w-12 h-12 bg-[#0033A0] text-white rounded-2xl shadow-xl flex items-center justify-center relative group"
              >
                <Bot size={24} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF671F] rounded-full border-2 border-[#050810]"></span>
              </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="pointer-events-auto bg-[#10141d] rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden border border-white/10 h-[380px]"
          >
            {/* Header */}
            <div className="bg-[#0033A0]/80 backdrop-blur-md text-white p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-[#FF671F]">
                    <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-black text-[10px] uppercase tracking-widest leading-none">DineBot AI</h3>
                  <p className="text-[8px] text-blue-200 font-bold uppercase mt-1">Ready to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg"><ChevronDown size={18} /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-[1.25rem] px-3.5 py-2.5 text-[11px] leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                      ? 'bg-[#0033A0] text-white rounded-tr-none' 
                      : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 rounded-2xl px-3 py-2 flex gap-1">
                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-white/40 rounded-full"></motion.span>
                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-white/40 rounded-full"></motion.span>
                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-white/40 rounded-full"></motion.span>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/5 border-t border-white/5 flex gap-2">
              <input 
                type="text" value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                placeholder="Type a message..." 
                className="flex-1 bg-black/40 rounded-xl px-4 text-[10px] font-medium text-white outline-none placeholder:text-slate-600" 
              />
              <button onClick={handleSend} disabled={!input.trim() || isLoading} className="w-10 h-10 bg-[#FF671F] text-white rounded-xl flex items-center justify-center disabled:opacity-30"><Send size={14} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
