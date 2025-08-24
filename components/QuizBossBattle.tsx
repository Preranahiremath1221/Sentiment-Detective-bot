import React, { useState, useEffect, useMemo } from 'react';
import { BOSS_BATTLE_QUESTIONS } from '../constants';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface QuizBossBattleProps {
  onGameComplete: () => void;
}

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const QuizBossBattle: React.FC<QuizBossBattleProps> = ({ onGameComplete }) => {
  const [questions, setQuestions] = useState(() => shuffleArray(BOSS_BATTLE_QUESTIONS));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bossHealth, setBossHealth] = useState(100);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

  const DAMAGE_PER_HIT = 100 / BOSS_BATTLE_QUESTIONS.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setBossHealth(prev => Math.max(0, prev - DAMAGE_PER_HIT));
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
         // End of questions, determine game state
         const finalHealth = option === currentQuestion.correctAnswer ? bossHealth - DAMAGE_PER_HIT : bossHealth;
         if (finalHealth <= 0) {
           setGameState('won');
         } else {
           setGameState('lost');
         }
      }
    }, 1500);
  };
  
  useEffect(() => {
    if (bossHealth <= 0) {
        setGameState('won');
    }
  }, [bossHealth]);

  useEffect(() => {
    if (gameState === 'won') {
      onGameComplete();
    }
  }, [gameState, onGameComplete]);
  
  const resetGame = () => {
      setQuestions(shuffleArray(BOSS_BATTLE_QUESTIONS));
      setCurrentQuestionIndex(0);
      setBossHealth(100);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setGameState('playing');
  }

  if (gameState === 'lost') {
      return (
          <div className="text-center p-6 bg-red-100 rounded-lg">
              <h3 className="text-2xl font-bold text-red-700">Oh no! The Monster is too strong!</h3>
              <p className="text-red-600 mb-4">Don't worry, you can try again!</p>
              <button onClick={resetGame} className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600">
                  Try Again
              </button>
          </div>
      )
  }

  if (gameState === 'won') {
       return (
          <div className="text-center p-6 bg-green-100 rounded-lg">
              <h3 className="text-2xl font-bold text-green-700">You did it! You defeated the monster! 🎉</h3>
              <p className="text-green-600">You're a true sentiment expert!</p>
          </div>
      )
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-2xl">
      <div className="text-center mb-4">
        <div className={`text-6xl mb-2 transition-transform duration-300 ${isAnswered && !isCorrect ? 'animate-shake' : ''} ${isAnswered && isCorrect ? 'animate-ping once' : ''}`}>👾</div>
        <h3 className="text-xl font-bold text-gray-800">Confusing Sentences Monster</h3>
        <div className="w-full bg-gray-300 rounded-full h-6 mt-2 border-2 border-gray-400">
          <div 
            className="bg-red-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${bossHealth}%` }}
          ></div>
        </div>
         <p className="text-sm font-bold text-red-700">{Math.round(bossHealth)}% HP</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-inner">
         <p className="font-semibold text-lg text-center mb-4">{currentQuestion?.question}</p>
         <div className="space-y-3">
             {currentQuestion?.options.map(option => {
                 const isSelected = selectedAnswer === option;
                 const isCorrectOption = option === currentQuestion.correctAnswer;
                 let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-semibold ";
                 
                 if (isAnswered) {
                     if (isSelected && isCorrectOption) buttonClass += "bg-green-100 border-green-500 text-green-800";
                     else if (isSelected && !isCorrectOption) buttonClass += "bg-red-100 border-red-500 text-red-800";
                     else if (isCorrectOption) buttonClass += "bg-green-100 border-green-500 text-green-800 opacity-60";
                     else buttonClass += "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed opacity-60";
                 } else {
                     buttonClass += "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400";
                 }

                 return (
                     <button key={option} onClick={() => handleAnswerSelect(option)} disabled={isAnswered} className={buttonClass}>
                         {option}
                     </button>
                 );
             })}
         </div>
      </div>
    </div>
  );
};

// Add shake animation to global styles if it doesn't exist.
const style = document.createElement('style');
style.textContent = `
  .animate-ping.once {
      animation: ping 1s cubic-bezier(0, 0, 0.2, 1) 1;
  }
`;
document.head.append(style);