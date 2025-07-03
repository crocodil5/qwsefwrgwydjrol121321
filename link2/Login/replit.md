# Full-Stack Web Application

## Overview

This is a modern full-stack web application built with React, Express.js, and PostgreSQL. The application uses TypeScript throughout and implements a clean, component-based architecture with shadcn/ui for the frontend and Drizzle ORM for database management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with `/api` prefix
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store

### Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for schema definition and migrations
- **Schema Location**: Shared schema in `shared/schema.ts`
- **Migrations**: Automated with Drizzle Kit

## Key Components

### Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── server/               # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data access layer
│   └── vite.ts           # Development server setup
├── shared/               # Shared TypeScript definitions
│   └── schema.ts         # Database schema and types
└── migrations/           # Database migration files
```

### Authentication & Storage
- Memory-based storage implementation with interface for easy database migration
- User management with username/password authentication
- Session handling prepared for production deployment

### UI Components
- Comprehensive shadcn/ui component library
- Custom PayPal-inspired design tokens
- Responsive design with mobile-first approach
- Accessible components built on Radix UI

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle requests with proper error handling
3. **Storage Layer**: Storage interface abstracts data operations
4. **Database**: Drizzle ORM manages PostgreSQL interactions
5. **Response**: Type-safe data flows back through the layers

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- UI framework (Radix UI components, Lucide icons)
- Development tools (Vite, TypeScript, Tailwind CSS)
- State management (TanStack Query)

### Backend Dependencies
- Express.js with TypeScript support
- Database connectivity (Neon serverless, Drizzle ORM)
- Session management (connect-pg-simple)
- Build tools (ESBuild for production builds)

### Development Dependencies
- TypeScript configuration with strict mode
- Vite with React plugin and runtime error overlay
- Replit-specific development tools

## Deployment Strategy

### Development
- Vite development server with HMR
- Express server with middleware integration
- Memory storage for rapid prototyping
- TypeScript compilation with strict checking

### Production
- Static asset building with Vite
- Express server bundling with ESBuild
- PostgreSQL database with connection pooling
- Environment variable configuration for database URL

### Build Process
1. Frontend assets built to `dist/public`
2. Backend bundled to `dist/index.js`
3. Database migrations applied via Drizzle Kit
4. Environment variables validated at startup

## Changelog
- July 03, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.