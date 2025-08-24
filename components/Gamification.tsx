
import React from 'react';
import type { Badge } from '../types';
import { Page } from '../types';

interface GamificationProps {
  currentPage: Page;
  badges: Badge[];
}

const pageSteps = ['Start', 'Learn', 'Build', 'Play'];

export const Gamification: React.FC<GamificationProps> = ({ currentPage, badges }) => {
    const currentStepIndex = Object.values(Page).indexOf(currentPage);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md p-4 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-700">Your Progress</h2>
            <div className="flex items-center space-x-2">
                 <h3 className="font-bold text-gray-700">My Badges:</h3>
                 <div className="flex space-x-1">
                    {badges.map(badge => (
                        <div key={badge.id} className="tooltip-container relative group">
                            <div className={`p-1.5 rounded-full ${badge.earned ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                                {badge.icon}
                            </div>
                             <div className="absolute bottom-full mb-2 w-48 bg-gray-800 text-white text-center text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
                                <p className="font-bold">{badge.name}</p>
                                <p>{badge.description}</p>
                                {!badge.earned && <p className="font-bold text-red-400">(Not Earned)</p>}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 relative flex items-center justify-between">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500" 
            style={{ width: `${(currentStepIndex / (pageSteps.length - 1)) * 100}%` }}
          ></div>
          {pageSteps.map((step, index) => (
            <div key={step} className={`absolute top-1/2 -translate-y-1/2`} style={{ left: `${(index / (pageSteps.length - 1)) * 100}%`}}>
                <div className={`w-6 h-6 rounded-full border-4  flex items-center justify-center -translate-x-1/2 ${index <= currentStepIndex ? 'bg-blue-500 border-white' : 'bg-gray-300 border-white'}`}>
                   {index <= currentStepIndex && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                 <span className={`absolute top-full mt-2 text-xs font-bold -translate-x-1/2 ${index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
