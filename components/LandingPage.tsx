
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-500">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="text-6xl animate-bounce">🧑</span>
          <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🤖</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">Chippy's Chatbot Creator</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">Meet Riya and her robot buddy Chippy! Together, they'll teach you how to build your own chatbot.</p>
        <div className="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg mb-8">
            <p className="font-semibold">What's a chatbot?</p>
            <p>It's a talking robot on your screen that can answer questions!</p>
        </div>
        <button 
          onClick={onStart} 
          className="bg-purple-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg hover:bg-purple-700 transform hover:scale-110 transition-all duration-300 ease-in-out"
        >
          Start Building!
        </button>
      </div>
    </div>
  );
};
