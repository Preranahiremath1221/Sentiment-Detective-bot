import React, { useState } from 'react';
import type { LearningStage } from '../types';
import { LEARNING_STAGES, CHARACTers } from '../constants';
import { MemoryGame } from './MemoryGame';
import { QuizBossBattle } from './QuizBossBattle';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { MoodPictureMatch } from './MoodPictureMatch';
import { EmotionSortingGallery } from './EmotionSortingGallery';

interface LearningModuleProps {
  onComplete: (badgeId: string) => void;
  onFinishModule: () => void;
}

export const LearningModule: React.FC<LearningModuleProps> = ({ onComplete, onFinishModule }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [bossBattleCompleted, setBossBattleCompleted] = useState(false);
  const [moodMatchCompleted, setMoodMatchCompleted] = useState(false);
  const [emotionSortCompleted, setEmotionSortCompleted] = useState(false);


  const currentStage = LEARNING_STAGES[currentStageIndex];
  const character = CHARACTers[currentStage.character];
  const isLastStage = currentStageIndex === LEARNING_STAGES.length - 1;

  const handleNext = () => {
    if (currentStage.badge) {
      onComplete(currentStage.badge);
    }
    
    if (isLastStage) {
        onFinishModule();
        return;
    }

    setCurrentStageIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameCompleted(false);
    setBossBattleCompleted(false);
    setMoodMatchCompleted(false);
    setEmotionSortCompleted(false);
  };
  
  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
  }

  const isCorrect = selectedAnswer === currentStage.quiz?.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-cyan-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-all duration-500">
        <div className="relative mb-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                    className="bg-green-500 h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${((currentStageIndex + 1) / LEARNING_STAGES.length) * 100}%` }}
                ></div>
            </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-inner">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentStage.title}</h2>
            
            <div className="flex items-start space-x-4 mb-6">
                <span className="text-5xl">{character.image}</span>
                <div>
                    <p className={`font-bold ${character.color}`}>{character.name} says:</p>
                    <p className="text-gray-700 text-lg">{currentStage.dialogue}</p>
                </div>
            </div>

            {currentStage.interactiveElement === 'quiz' && currentStage.quiz && (
                <div className="mt-6 space-y-3">
                    <p className="font-semibold text-lg">{currentStage.quiz.question}</p>
                    {currentStage.quiz.options.map(option => {
                        const isSelected = selectedAnswer === option;
                        const isCorrectOption = option === currentStage.quiz?.correctAnswer;
                        let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
                        if (isAnswered) {
                            if (isSelected && isCorrectOption) buttonClass += "bg-green-100 border-green-500 text-green-800";
                            else if (isSelected && !isCorrectOption) buttonClass += "bg-red-100 border-red-500 text-red-800";
                            else if (isCorrectOption) buttonClass += "bg-green-100 border-green-500 text-green-800";
                            else buttonClass += "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed";
                        } else {
                            buttonClass += "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400";
                        }
                        return (
                            <button key={option} onClick={() => handleAnswerSelect(option)} className={buttonClass} disabled={isAnswered}>
                                {option}
                            </button>
                        );
                    })}
                    {isAnswered && (
                        <div className={`flex items-center mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {isCorrect ? <CheckCircleIcon className="h-6 w-6 mr-2"/> : <XCircleIcon className="h-6 w-6 mr-2"/>}
                            {isCorrect ? "That's right! Great job!" : `Not quite! The correct answer was "${currentStage.quiz.correctAnswer}".`}
                        </div>
                    )}
                </div>
            )}
            
            {currentStage.interactiveElement === 'game' && (
                <MemoryGame onGameComplete={() => setGameCompleted(true)} />
            )}

            {currentStage.interactiveElement === 'bossBattle' && (
                <QuizBossBattle onGameComplete={() => setBossBattleCompleted(true)} />
            )}

            {currentStage.interactiveElement === 'moodMatch' && (
                <MoodPictureMatch onGameComplete={() => setMoodMatchCompleted(true)} />
            )}
            
            {currentStage.interactiveElement === 'emotionSort' && (
                <EmotionSortingGallery onGameComplete={() => setEmotionSortCompleted(true)} />
            )}
        </div>

        <div className="mt-8 text-right">
            <button 
              onClick={handleNext}
              disabled={
                  (currentStage.interactiveElement === 'quiz' && !isCorrect) ||
                  (currentStage.interactiveElement === 'game' && !gameCompleted) ||
                  (currentStage.interactiveElement === 'bossBattle' && !bossBattleCompleted) ||
                  (currentStage.interactiveElement === 'moodMatch' && !moodMatchCompleted) ||
                  (currentStage.interactiveElement === 'emotionSort' && !emotionSortCompleted)
              }
              className="bg-green-600 text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLastStage ? "Finish & Build!" : "Next →"}
            </button>
        </div>
      </div>
    </div>
  );
};