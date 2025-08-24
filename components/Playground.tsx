
import React, { useState, useRef, useEffect } from 'react';
import type { ChatbotConfig, ChatMessage } from '../types';
import { getAiResponse } from '../services/Service';
import { LightBulbIcon } from './Icons';

interface PlaygroundProps {
  config: ChatbotConfig;
  onGoBack: () => void;
  onEarnBadge: (badgeId: string) => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ config, onGoBack, onEarnBadge }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: Date.now(), sender: 'bot', text: `Hi! I'm ready to chat. I have a ${config.personality.split(' ')[1]} personality!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Check for rule-based response
    const rule = config.rules.find(r => r.question.toLowerCase().trim() === input.toLowerCase().trim());
    
    if (rule) {
        setTimeout(() => {
            const botMessage: ChatMessage = { id: Date.now() + 1, sender: 'bot', text: rule.answer, type: 'rule' };
            setMessages(prev => [...prev, botMessage]);
            setIsLoading(false);
        }, 500);
    } else {
        // AI-based response
        if (config.personality.includes('Funny') && (input.toLowerCase().includes('joke') || input.toLowerCase().includes('funny'))) {
            onEarnBadge('joke_master');
        }

        const history = messages.map(msg => ({
            role: msg.sender === 'user' ? ('user' as const) : ('model' as const),
            parts: [{ text: msg.text }],
        }));

        const aiText = await getAiResponse(input, config.personality, history);
        const botMessage: ChatMessage = { id: Date.now() + 1, sender: 'bot', text: aiText, type: 'ai' };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
             <h1 className="text-3xl font-bold text-gray-800">Chat Playground</h1>
             <button onClick={onGoBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">← Back to Builder</button>
        </div>
       
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                   {msg.sender === 'bot' && <span className="text-3xl">🤖</span>}
                   <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                        <p>{msg.text}</p>
                        {msg.sender === 'bot' && msg.type && (
                             <div className={`flex items-center text-xs mt-2 p-1 rounded-full ${msg.type === 'rule' ? 'bg-yellow-200 text-yellow-800' : 'bg-purple-200 text-purple-800'}`}>
                                <LightBulbIcon />
                                {msg.type === 'rule' ? 'Rule-Based' : 'AI-Powered'}
                            </div>
                        )}
                   </div>
                </div>
            ))}
             {isLoading && (
                 <div className="flex items-end gap-2 justify-start">
                    <span className="text-3xl">🤖</span>
                    <div className="max-w-xs p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                        <div className="flex items-center space-x-1">
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your chatbot something..."
                className="flex-1 p-4 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-purple-600 text-white font-bold w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
        </form>
      </div>
    </div>
  );
};
