import React, { useState } from 'react';
import { MOOD_MATCH_QUESTIONS } from '../constants';

interface MoodPictureMatchProps {
  onGameComplete: () => void;
}

export const MoodPictureMatch: React.FC<MoodPictureMatchProps> = ({ onGameComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showStar, setShowStar] = useState(false);

  const currentQuestion = MOOD_MATCH_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === MOOD_MATCH_QUESTIONS.length - 1;

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setShowStar(true);
      setTimeout(() => setShowStar(false), 1000);
      setTimeout(() => {
        if (isLastQuestion) {
          onGameComplete();
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        }
      }, 1500);
    }
  };
  
  const allDone = currentQuestionIndex === MOOD_MATCH_QUESTIONS.length - 1 && isCorrect;

  if (allDone) {
      return (
           <div className="text-center p-6 bg-green-100 rounded-lg">
              <h3 className="text-2xl font-bold text-green-700">Great job! You matched all the moods! ⭐</h3>
          </div>
      )
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-2xl relative">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-4">What's the mood?</h3>
        <div className="text-8xl text-center bg-white p-6 rounded-lg shadow-inner mb-4">
            {currentQuestion.scene}
        </div>
        <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map(option => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === currentQuestion.correctAnswer;
                let buttonClass = "w-full p-4 rounded-lg border-2 font-semibold text-lg transition-all ";
                
                if (selectedAnswer) {
                    if (isSelected && isCorrectOption) buttonClass += "bg-green-200 border-green-500";
                    else if (isSelected && !isCorrectOption) buttonClass += "bg-red-200 border-red-500 animate-shake";
                    else if (isCorrectOption) buttonClass += "bg-green-200 border-green-500 opacity-70";
                    else buttonClass += "bg-gray-200 border-gray-400 opacity-70";
                } else {
                    buttonClass += "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400";
                }

                return (
                    <button key={option} onClick={() => handleAnswerClick(option)} disabled={!!selectedAnswer} className={buttonClass}>
                        {option}
                    </button>
                )
            })}
        </div>
         {showStar && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl animate-pop-in">⭐</div>}
    </div>
  );
};