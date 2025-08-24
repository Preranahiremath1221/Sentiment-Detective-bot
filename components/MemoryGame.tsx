import React, { useState, useEffect } from 'react';
import { MEMORY_GAME_PAIRS } from '../constants';

interface MemoryCard {
  id: number;
  type: 'sentence' | 'emoji';
  content: string;
  matchId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onGameComplete: () => void;
}

const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
};

export const MemoryGame: React.FC<MemoryGameProps> = ({ onGameComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCardIndices, setFlippedCardIndices] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const gameCards: MemoryCard[] = [];
    MEMORY_GAME_PAIRS.forEach(pair => {
      gameCards.push({ id: pair.id * 2 - 1, type: 'sentence', content: pair.sentence, matchId: pair.id, isFlipped: false, isMatched: false });
      gameCards.push({ id: pair.id * 2, type: 'emoji', content: pair.emoji, matchId: pair.id, isFlipped: false, isMatched: false });
    });
    setCards(shuffleArray(gameCards));
  }, []);

  useEffect(() => {
    if (flippedCardIndices.length === 2) {
      setIsChecking(true);
      const [firstCardIndex, secondCardIndex] = flippedCardIndices;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      if (firstCard.matchId === secondCard.matchId) {
        setCards(prev => prev.map(card => 
          card.matchId === firstCard.matchId ? { ...card, isMatched: true } : card
        ));
        setFlippedCardIndices([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) =>
            (index === firstCardIndex || index === secondCardIndex) ? { ...card, isFlipped: false } : card
          ));
          setFlippedCardIndices([]);
          setIsChecking(false);
        }, 1200);
      }
    }
  }, [flippedCardIndices, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => {
        onGameComplete();
      }, 800);
    }
  }, [cards, onGameComplete]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || flippedCardIndices.length === 2) {
      return;
    }

    setCards(prev => prev.map((card, i) => i === index ? { ...card, isFlipped: true } : card));
    setFlippedCardIndices(prev => [...prev, index]);
  };

  const allMatched = cards.length > 0 && cards.every(card => card.isMatched);

  return (
    <div className="mt-6">
      <div className={`grid grid-cols-4 gap-2 md:gap-4 transition-opacity duration-500 ${allMatched ? 'opacity-50' : ''}`}>
        {cards.map((card, index) => (
          <div key={card.id} className="perspective-1000" onClick={() => handleCardClick(index)}>
            <div className={`relative w-full h-24 md:h-28 transform-style-3d transition-transform duration-700 ${card.isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-blue-400 rounded-lg shadow-md cursor-pointer hover:bg-blue-500 transition-colors">
                <span className="text-4xl text-white font-bold">?</span>
              </div>
              <div className={`absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-2 text-center rounded-lg shadow-md transition-colors duration-500 ${card.isMatched ? 'bg-green-300' : 'bg-white'}`}>
                <span className={card.type === 'emoji' ? 'text-4xl' : 'text-sm md:text-base font-semibold text-gray-800'}>{card.content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {allMatched && (
        <div className="mt-4 text-center text-2xl font-bold text-green-600 animate-pulse">
          You found all the matches! 🎉
        </div>
      )}
    </div>
  );
};
