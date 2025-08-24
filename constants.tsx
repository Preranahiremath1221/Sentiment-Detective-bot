import React from 'react';
import type { Badge, LearningStage } from './types';
import { BrainIcon, ChatBubbleIcon, EmotionDetectiveIcon, FirstBotIcon, JokeMasterIcon, MoodMasterIcon, QuizBossIcon, SortingStarIcon } from './components/Icons';

export const CHARACTers = {
  riya: { name: 'Riya', color: 'text-pink-500', image: '🧑' },
  chippy: { name: 'Chippy', color: 'text-blue-500', image: '🤖' },
  senti: { name: 'Senti the Detective', color: 'text-yellow-600', image: '🕵️‍♂️' },
};

export const INITIAL_BADGES: Badge[] = [
  { id: 'first_step', name: 'First Step', description: 'You started your journey!', icon: <FirstBotIcon />, earned: false },
  { id: 'rule_master', name: 'Rule Master', description: 'You learned about rules!', icon: <ChatBubbleIcon />, earned: false },
  { id: 'ai_explorer', name: 'AI Explorer', description: 'You learned about AI!', icon: <BrainIcon />, earned: false },
  { id: 'sorting_star', name: 'Sorting Star', description: 'You sorted emotions into categories!', icon: <SortingStarIcon />, earned: false },
  { id: 'mood_master', name: 'Mood Master', description: 'You matched moods to pictures!', icon: <MoodMasterIcon />, earned: false },
  { id: 'emotion_detective', name: 'Emotion Detective', description: 'You matched emotions like a pro!', icon: <EmotionDetectiveIcon />, earned: false },
  { id: 'quiz_boss', name: 'Quiz Boss', description: 'You defeated the monster!', icon: <QuizBossIcon />, earned: false },
  { id: 'joke_master', name: 'Joke Master', description: 'You built a funny bot!', icon: <JokeMasterIcon />, earned: false },
];

export const MEMORY_GAME_PAIRS = [
    { id: 1, sentence: "I won the race!", emoji: "🎉" },
    { id: 2, sentence: "I lost my toy.", emoji: "😢" },
    { id: 3, sentence: "That's so funny!", emoji: "😂" },
    { id: 4, sentence: "I'm so tired.", emoji: "😴" },
];

export const BOSS_BATTLE_QUESTIONS = [
    {
        question: "Wow, a surprise party! I had no idea!",
        options: ["Happy 😊", "Sad 😢", "Angry 😠"],
        correctAnswer: "Happy 😊"
    },
    {
        question: "My ice cream fell on the ground.",
        options: ["Happy 😊", "Sad 😢", "Surprised 😮"],
        correctAnswer: "Sad 😢"
    },
    {
        question: "I can't believe you broke my favorite toy!",
        options: ["Happy 😊", "Neutral 😐", "Angry 😠"],
        correctAnswer: "Angry 😠"
    },
    {
        question: "This movie is okay, I guess.",
        options: ["Happy 😊", "Sad 😢", "Neutral 😐"],
        correctAnswer: "Neutral 😐"
    },
];

export const MOOD_MATCH_QUESTIONS = [
    { scene: '🍦', options: ["Happy", "Sad", "Angry", "Excited"], correctAnswer: "Happy" },
    { scene: '🌧️', options: ["Happy", "Sad", "Angry", "Bored"], correctAnswer: "Sad" },
    { scene: '😭', options: ["Joyful", "Tired", "Sad", "Excited"], correctAnswer: "Sad" },
    { scene: '🎁', options: ["Angry", "Bored", "Excited", "Sad"], correctAnswer: "Excited" },
];

export const EMOTION_SORTING_ITEMS = [
  { id: 1, content: '😃', category: 'positive' as const },
  { id: 2, content: '😢', category: 'negative' as const },
  { id: 3, content: '🎉', category: 'positive' as const },
  { id: 4, content: '⚡', category: 'negative' as const },
  { id: 5, content: '🥳', category: 'positive' as const },
  { id: 6, content: '💔', category: 'negative' as const },
  { id: 7, content: '🌞', category: 'positive' as const },
  { id: 8, content: '🌧️', category: 'negative' as const },
];


export const LEARNING_STAGES: LearningStage[] = [
  {
    id: 1,
    title: "What is a Chatbot?",
    character: 'riya',
    dialogue: "Hi! I'm Riya, and this is my robot buddy Chippy! A chatbot is like a talking robot on a computer that can answer your questions. Let's build one!",
    badge: 'first_step',
    interactiveElement: 'none',
  },
  {
    id: 2,
    title: "Rule-Based Chatbots",
    character: 'senti',
    dialogue: "I'm Senti the Detective! The simplest chatbots follow rules. It's like a script! If you say 'hello', it knows to say 'hi back'. This is called a 'rule-based' chatbot.",
    interactiveElement: 'none',
  },
  {
    id: 3,
    title: "Your First Rule",
    character: 'chippy',
    dialogue: "Let's try it! A user asks, 'What is your name?'. What should the chatbot reply? Pick the best answer!",
    interactiveElement: 'quiz',
    quiz: {
      question: "If user says: 'What is your name?'",
      options: ["I am a robot.", "My name is Chippy!", "I don't know."],
      correctAnswer: "My name is Chippy!",
    },
    badge: 'rule_master',
  },
  {
    id: 4,
    title: "What About AI?",
    character: 'riya',
    dialogue: "But what if I ask a question you didn't make a rule for? That's where AI comes in! AI is like a brain for the chatbot. It can understand and figure out answers on its own!",
    interactiveElement: 'none',
  },
   {
    id: 5,
    title: "AI Power!",
    character: 'chippy',
    dialogue: "With AI, I can answer almost anything! If you ask me to 'tell a joke', my AI brain knows you want something funny, even without a specific rule.",
    interactiveElement: 'quiz',
    badge: 'ai_explorer',
    quiz: {
      question: "Which type of chatbot can answer questions it wasn't specifically taught?",
      options: ["Rule-based", "AI-powered"],
      correctAnswer: "AI-powered",
    },
  },
  {
    id: 6,
    title: "Emotion Sorting Gallery",
    character: 'senti',
    dialogue: "Time for a challenge! Some feelings are positive (like happiness) and some are negative (like sadness). Drag each picture to the correct box. Be quick!",
    interactiveElement: 'emotionSort',
    badge: 'sorting_star',
  },
  {
    id: 7,
    title: "Mood Picture Match",
    character: 'riya',
    dialogue: "You're getting good at this! Now, let's look at some scenes and figure out the mood. Pick the emotion that best fits the picture.",
    interactiveElement: 'moodMatch',
    badge: 'mood_master',
  },
  {
    id: 8,
    title: "Emotion Detective Game",
    character: 'senti',
    dialogue: "Let's play a game! A smart chatbot needs to understand feelings. Match the sentence to the right emotion emoji. Find all the pairs!",
    interactiveElement: 'game',
    badge: 'emotion_detective',
  },
  {
    id: 9,
    title: "Quiz Boss Battle!",
    character: 'chippy',
    dialogue: "Oh no! It's the Confusing Sentences Monster! It's mixing up all the emotions. Answer the questions correctly to defeat it!",
    interactiveElement: 'bossBattle',
    badge: 'quiz_boss',
  },
  {
    id: 10,
    title: "Let's Build!",
    character: 'riya',
    dialogue: "You did it! You're an expert now. You're ready to go to the builder and create your very own chatbot. Let's do it!",
    interactiveElement: 'none',
  }
];