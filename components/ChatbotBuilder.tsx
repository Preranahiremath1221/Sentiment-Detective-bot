
import React, { useState } from 'react';
import type { ChatbotConfig, Rule } from '../types';
import { Personality } from '../types';

interface ChatbotBuilderProps {
  config: ChatbotConfig;
  onConfigChange: (newConfig: ChatbotConfig) => void;
  onContinue: () => void;
}

export const ChatbotBuilder: React.FC<ChatbotBuilderProps> = ({ config, onConfigChange, onContinue }) => {
  const [newRule, setNewRule] = useState({ question: '', answer: '' });

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRule.question.trim() && newRule.answer.trim()) {
      const updatedConfig = {
        ...config,
        rules: [...config.rules, { ...newRule, id: Date.now() }],
      };
      onConfigChange(updatedConfig);
      setNewRule({ question: '', answer: '' });
    }
  };

  const handleRemoveRule = (id: number) => {
    const updatedConfig = {
      ...config,
      rules: config.rules.filter(rule => rule.id !== id),
    };
    onConfigChange(updatedConfig);
  };
  
  const handlePersonalityChange = (personality: Personality) => {
      onConfigChange({...config, personality});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Build Your Chatbot! 🛠️</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side: Personality & Name */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Step 1: Choose a Personality</h2>
                <div className="space-y-3">
                    {(Object.values(Personality) as Personality[]).map(p => (
                        <button 
                            key={p} 
                            onClick={() => handlePersonalityChange(p)}
                            className={`w-full text-left p-4 rounded-lg border-2 font-semibold text-lg transition-all ${config.personality === p ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300 hover:border-blue-400'}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Side: Rules */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
                 <h2 className="text-2xl font-bold text-gray-700 mb-4">Step 2: Add Custom Rules</h2>
                 <form onSubmit={handleAddRule} className="space-y-3 mb-4">
                    <input 
                        type="text" 
                        placeholder="If user says..."
                        value={newRule.question}
                        onChange={(e) => setNewRule({...newRule, question: e.target.value})}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                    />
                    <input 
                        type="text" 
                        placeholder="Your bot replies..."
                        value={newRule.answer}
                        onChange={(e) => setNewRule({...newRule, answer: e.target.value})}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                    />
                    <button type="submit" className="w-full bg-yellow-500 text-white font-bold p-3 rounded-lg hover:bg-yellow-600 transition">Add Rule +</button>
                 </form>

                <div className="h-40 overflow-y-auto space-y-2 pr-2">
                    {config.rules.length === 0 ? (
                        <p className="text-gray-500 text-center mt-4">No rules yet. Add one above!</p>
                    ) : (
                        config.rules.map(rule => (
                            <div key={rule.id} className="bg-gray-100 p-2 rounded-lg flex justify-between items-center">
                                <div className="text-sm">
                                    <p><span className="font-bold">Q:</span> {rule.question}</p>
                                    <p><span className="font-bold">A:</span> {rule.answer}</p>
                                </div>
                                <button onClick={() => handleRemoveRule(rule.id)} className="text-red-500 hover:text-red-700 font-bold p-1">✕</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
        
        <div className="mt-8 text-center">
            <button 
                onClick={onContinue}
                className="bg-orange-500 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg hover:bg-orange-600 transform hover:scale-110 transition-all duration-300"
            >
                Let's Test My Bot!
            </button>
        </div>
      </div>
    </div>
  );
};
