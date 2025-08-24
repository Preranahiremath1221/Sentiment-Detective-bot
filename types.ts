import type { ReactNode } from 'react';

export enum Page {
  Landing,
  Learning,
  Builder,
  Playground,
}

export enum Personality {
  Friendly = '😊 Friendly',
  Funny = '🤪 Funny',
  Serious = '🤓 Serious',
}

export interface Rule {
  id: number;
  question: string;
  answer: string;
}

export interface ChatbotConfig {
  name: string;
  personality: Personality;
  rules: Rule[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  type?: 'rule' | 'ai';
  id: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  earned: boolean;
}

export type LearningStage = {
  id: number;
  title: string;
  character: 'riya' | 'chippy' | 'senti';
  dialogue: string;
  badge?: string;
  interactiveElement?: 'quiz' | 'game' | 'bossBattle' | 'moodMatch' | 'emotionSort' | 'none';
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
};