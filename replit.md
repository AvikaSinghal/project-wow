# Wishes on Windmills - AI Therapeutic Support Application

## Overview

Wishes on Windmills is a full-stack web application that provides AI-powered therapeutic support specifically designed for students (ages 14-18). The application offers confidential, 24/7 accessible mental health conversations with crisis detection capabilities and professional resource connections. The site features a calming meditation dog logo and warm therapeutic color scheme (#ecb4a7, #f9dcd1, #59291f) that reinforces the therapeutic and mindfulness aspects of the platform.

The application now includes comprehensive self-care tools, academic support resources, and a global crisis support system with interactive features like properly functioning 4-7-8 breathing exercises, gratitude journals, Pomodoro timers, assignment tracking, and country-specific emergency numbers to support students' overall wellness and academic success.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (Latest)

### Customizable Avatar for Emotional Expression (August 6, 2025)
✓ Implemented comprehensive avatar system with Windmill the dog character
✓ 9 distinct emotions: happy, caring, thoughtful, supportive, excited, concerned, neutral, listening, encouraging
✓ Dynamic emotion changes based on user messages and conversation context
✓ Smooth animations with tail wagging, ear movements, and facial expressions
✓ Integrated avatar throughout chat interface: header, welcome messages, conversation starters
✓ useAvatarEmotion hook for intelligent emotion management and context awareness
✓ Added delete functionality for chat history with confirmation prompts and ownership verification
✓ Enhanced privacy isolation - each browser session sees only their own conversations
✓ Redesigned avatar to be friendlier and more appealing with cartoon-style features, warm colors, and cute details
✓ Transformed avatar into a full-body golden retriever with authentic breed characteristics, collar, and natural proportions

### Onboarding Tutorial & Conversation Features (August 5, 2025)
✓ Implemented playful onboarding tutorial with animated dog character guide (Windmill)
✓ 6-step tutorial covering platform features, safety, conversation starters, and privacy
✓ Character shows different emotions (excited, caring, thoughtful, supportive) with animations
✓ Interactive progress indicator and smooth transitions between steps
✓ Tutorial auto-shows for new users and can be restarted by returning users via help button
✓ Added special "bye bye" response handling - AI responds with caring goodbye message
✓ Fixed favicon implementation with meditation dog logo in browser tabs

### Personalized Conversation Starters Implementation (August 4, 2025)
✓ Created comprehensive conversation starter system with 8 emotional categories
✓ Categories include: Feeling Stressed, Academic Pressure, Social Issues, Family Stuff, Feeling Low, Excited/Good News, Tired/Burnt Out, Future Worries
✓ Each category contains 5 thoughtful conversation prompts matching that emotional state
✓ Interactive mood selection with color-coded icons and two-line descriptions
✓ Starters automatically hide once user begins chatting for seamless experience
✓ Fixed text overflow issues with proper responsive design and line breaking

### Navigation & Page Structure Updates (July 30, 2025)
✓ Created dedicated chat page at `/chat` with full navigation, emergency banner, and footer
✓ Updated home page hero section buttons to properly navigate: "Start Chatting" → `/chat`, "Learn More" → `/learn-more`
✓ Fixed navigation bar links: "About" → `/learn-more`, "Chat" → `/chat` (both desktop and mobile)
✓ Enhanced AI Support Chat section styling with better spacing, white background, and "Project WOW" branding
✓ Improved button styling with shadows, hover effects, and better typography hierarchy
✓ Chat history functionality only available on dedicated chat page for cleaner UX

AI Personality Requirements: The AI should respond like an old friend who truly gets them - a casual, supportive companion who makes connections and processes everything into meaningful insights:
- **Friend-like approach**: Start with "hey, thanks for showing me this. my thoughts:" and talk like an old homie
- **Story-telling style**: Process everything the user says and deliver it back as a cohesive story that helps them feel what they need to feel
- **Match their tone**: Sound like the user themselves but with different perspectives and insights to offer
- **Make connections**: Help them see connections they don't see, comfort, validate, and gently challenge when needed
- **No formal therapy**: Don't therapize with formal breakdowns or repeat their thoughts with headings
- **Process don't repeat**: Don't just go through every single thing they say and repeat it back - weave it into something meaningful
- **Casual but not "yo"**: Keep it casual but avoid saying "yo" - use their own communication style
- **Energy matching**: When excited, match enthusiasm; when down, be deeply empathetic
- **Advice-focused**: Give practical support, coping strategies, breathing techniques, grounding exercises
- **Story-driven**: Help them feel what they need to feel by processing their thoughts into a cohesive narrative

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript running on Vite
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with hot module replacement in development

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: In-memory storage with interface for future database integration
- **AI Integration**: OpenAI GPT-4o for therapeutic conversations

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Development Storage**: In-memory storage implementation for rapid development
- **Session Management**: PostgreSQL session store using connect-pg-simple

## Key Components

### Database Schema
```typescript
// Sessions table for conversation tracking
sessions: {
  id: serial primary key
  title: text (conversation title)
  createdAt: timestamp
  updatedAt: timestamp
}

// Messages table for conversation history
messages: {
  id: serial primary key
  sessionId: references sessions.id
  content: text (message content)
  role: "user" | "assistant"
  timestamp: timestamp
  isCrisisDetected: boolean (flags crisis situations)
}
```

### API Endpoints
- `GET /api/sessions` - Retrieve all conversation sessions
- `POST /api/sessions` - Create new conversation session
- `GET /api/sessions/:id` - Get specific session with messages
- `POST /api/sessions/:id/messages` - Send message and get AI response
- `GET /api/sessions-with-messages` - Get all sessions with their messages

### Page Structure
- **Home Page** (`/`) - Main landing page with hero section, chat interface, and resource overview
- **Resources Page** (`/resources`) - Interactive self-care tools including breathing exercises and gratitude journal
- **Academic Support Page** (`/academic-support`) - Study productivity tools with Pomodoro timer and assignment tracker
- **Crisis Support Page** (`/crisis-support`) - Global emergency numbers and crisis resources organized by country
- **Learn More Page** (`/learn-more`) - Comprehensive platform information and features overview

### Frontend Components
- **SimpleChat**: Streamlined conversation interface with card-based design and avatar integration
- **AvatarDisplay**: Customizable emotional avatar system with Windmill character and 9 emotions
- **SessionHistoryModal**: Modal for viewing past conversations with delete functionality
- **EmergencyBanner**: Crisis resource banner with hotline information
- **ResourcesSection**: Comprehensive mental health resources with clickable Academic Support link
- **SafetyDisclaimers**: Important limitations and safety information
- **Interactive Self-Care Tools**: Breathing exercises, gratitude journal, quick activities
- **Academic Productivity Tools**: Pomodoro timer, assignment tracker, study techniques

### AI Integration
- **OpenAI Service**: GPT-4o integration for therapeutic responses
- **Crisis Detection**: Keyword-based crisis situation identification
- **Conversation Context**: Maintains conversation history for coherent responses
- **Therapeutic Prompting**: Specialized system prompts for age-appropriate support

## Data Flow

1. **User Interaction**: User clicks "Start New Conversation" then types messages in simplified chat interface
2. **Session Management**: Create new session if none exists, or use existing session
3. **Message Storage**: Store user message in database with session association
4. **AI Processing**: Local therapeutic response system processes message with emotion/mood detection
5. **Crisis Detection**: Analyze response for crisis indicators with Indian helplines
6. **Response Storage**: Store AI response with crisis detection flags
7. **Real-time Updates**: Update UI with new messages via React Query with proper query key management
8. **Session History**: Maintain session list for user to revisit conversations

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL connection

### UI and Styling
- **@radix-ui/***: Accessible React component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

### AI and External Services
- **openai**: Official OpenAI API client
- **connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and development experience
- **tsx**: TypeScript execution engine for development

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR on client directory
- **Backend**: tsx directly executing TypeScript server files
- **Database**: Neon Database cloud instance
- **Environment Variables**: DATABASE_URL and OPENAI_API_KEY required

### Production Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Static Serving**: Express serves built frontend assets
4. **Database Migrations**: Drizzle Kit manages schema changes

### Architecture Decisions

**Monorepo Structure**: Single repository with client, server, and shared directories for easier development and type sharing between frontend and backend.

**Drizzle ORM Choice**: Selected for type safety, PostgreSQL compatibility, and excellent TypeScript integration over alternatives like Prisma.

**In-Memory Storage Interface**: Implemented storage abstraction layer to enable rapid development while maintaining easy migration path to persistent database.

**React Query**: Chosen for robust server state management, caching, and optimistic updates essential for real-time chat experience.

**OpenAI Integration**: Direct API integration rather than SDK wrapper for maximum control over therapeutic conversation prompting and crisis detection.

**Crisis Detection**: Implemented client-side and server-side crisis keyword detection with immediate resource provision for user safety.