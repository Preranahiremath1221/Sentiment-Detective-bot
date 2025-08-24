
An interactive, gamified educational application that teaches children about chatbots, artificial intelligence, and emotional intelligence through fun, engaging activities.

## 🌟 Overview

Chippy's Chatbot Creator is designed to make learning about technology and emotions accessible and enjoyable for children. The application guides users through a structured learning journey where they:

- Learn about chatbots and AI concepts
- Practice emotional recognition and matching
- Build their own customizable chatbot
- Earn badges and rewards through gamified learning

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **Icons**: Heroicons React
- **Development**: TypeScript 5.8.2

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chippy's-chatbot-creator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
chippy's-chatbot-creator/
├── components/
│   ├── ChatbotBuilder.tsx      # Chatbot configuration interface
│   ├── EmotionSortingGallery.tsx # Emotion categorization game
│   ├── Gamification.tsx        # Badge system and progress tracking
│   ├── Icons.tsx              # Custom icon components
│   ├── LandingPage.tsx         # Welcome screen
│   ├── LearningModule.tsx      # Educational content and progression
│   ├── MemoryGame.tsx         # Emotion matching memory game
│   ├── MoodPictureMatch.tsx   # Scene-emotion matching activity
│   ├── Playground.tsx         # Chatbot testing interface
│   └── QuizBossBattle.tsx     # Final quiz challenge
├── services/
│   └── Service.ts             # API/service layer (if needed)
├── App.tsx                    # Main application component
├── constants.tsx              # Game data, badges, and learning content
├── types.ts                   # TypeScript type definitions
├── index.html                 # HTML template
├── index.tsx                  # React entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts            # Vite build configuration




## 🌐 Links
- **Project Hosting**: [https://sentiment-detector.netlify.app/](https://sentiment-detector.netlify.app/)
- **GitHub**: [Preranahiremath1221](https://github.com/Preranahiremath1221)

---

**Happy learning and chatbot building!** 🎉🤖
