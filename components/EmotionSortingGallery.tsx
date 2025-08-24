import React, { useState, useEffect, useRef } from 'react';
import { EMOTION_SORTING_ITEMS } from '../constants';

interface EmotionSortingGalleryProps {
  onGameComplete: () => void;
}

interface SortItem {
  id: number;
  content: string;
  category: 'positive' | 'negative';
}

const GAME_DURATION = 30;

export const EmotionSortingGallery: React.FC<EmotionSortingGalleryProps> = ({ onGameComplete }) => {
  const [items, setItems] = useState<SortItem[]>(() => [...EMOTION_SORTING_ITEMS].sort(() => Math.random() - 0.5));
  const [timer, setTimer] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const [draggedItem, setDraggedItem] = useState<SortItem | null>(null);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (timer <= 0 && gameState === 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState('lost');
    }
    if (items.length === 0 && gameState === 'playing') {
       if (timerRef.current) clearInterval(timerRef.current);
       setGameState('won');
       onGameComplete();
    }
  }, [timer, items, gameState, onGameComplete]);

  const handleDragStart = (item: SortItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, category: 'positive' | 'negative') => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.category === category) {
      setScore(prev => prev + 1);
      setItems(prev => prev.filter(item => item.id !== draggedItem.id));
      
      e.currentTarget.classList.add('animate-bounce-in-once');
      setTimeout(() => {
        e.currentTarget.classList.remove('animate-bounce-in-once');
      }, 500);

    } else {
      const draggedElement = document.getElementById(`sort-item-${draggedItem.id}`);
      if (draggedElement) {
        draggedElement.classList.add('animate-shake');
        setTimeout(() => {
          draggedElement.classList.remove('animate-shake');
        }, 500);
      }
    }
    setDraggedItem(null);
  };
  
  const resetGame = () => {
    setItems([...EMOTION_SORTING_ITEMS].sort(() => Math.random() - 0.5));
    setTimer(GAME_DURATION);
    setScore(0);
    setGameState('playing');
  }

  if (gameState === 'won') {
    return (
      <div className="text-center p-6 bg-green-100 rounded-lg">
        <h3 className="text-2xl font-bold text-green-700">Awesome Sorting! You got them all! 🏆</h3>
        <p className="text-green-600">You are a master of emotions!</p>
      </div>
    );
  }

  if (gameState === 'lost') {
    return (
      <div className="text-center p-6 bg-red-100 rounded-lg">
        <h3 className="text-2xl font-bold text-red-700">Time's up! ⏰</h3>
        <p className="text-red-600 mb-4">You sorted {score} items correctly. Great effort!</p>
        <button onClick={resetGame} className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600">
            Try Again
        </button>
      </div>
    );
  }


  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-blue-600">Time Left: {timer}s ⏰</div>
        <div className="text-lg font-bold text-green-600">Score: {score} ⭐</div>
      </div>

      <div className="h-32 overflow-y-auto bg-white p-4 rounded-lg shadow-inner mb-4 flex flex-wrap justify-center gap-4">
        {items.map(item => (
            <div 
                key={item.id}
                id={`sort-item-${item.id}`}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="text-4xl cursor-grab p-2 bg-gray-200 rounded-md hover:scale-110 transition-transform"
            >
                {item.content}
            </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'positive')}
            className="h-48 bg-green-200 border-4 border-dashed border-green-400 rounded-lg flex flex-col items-center justify-center transition-all duration-300"
        >
            <span className="text-5xl">😄</span>
            <span className="text-2xl font-bold text-green-800">Positive</span>
        </div>
        <div 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'negative')}
            className="h-48 bg-red-200 border-4 border-dashed border-red-400 rounded-lg flex flex-col items-center justify-center transition-all duration-300"
        >
            <span className="text-5xl">😞</span>
            <span className="text-2xl font-bold text-red-800">Negative</span>
        </div>
      </div>
    </div>
  );
};