# Full-Stack Web Application

## Overview
This is a modern full-stack web application built with React and Express.js. The application features a clean frontend using shadcn/ui components with Tailwind CSS styling, and a PostgreSQL database managed through Drizzle ORM. The project follows a monorepo structure with separate client and server directories, sharing common schema definitions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: express-session with PostgreSQL session store
- **Development**: Hot reload with tsx

### Data Storage
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Managed through drizzle-kit
- **Session Store**: PostgreSQL-based session storage using connect-pg-simple

## Key Components

### Directory Structure
```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and configs
├── server/                 # Express.js backend
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data access layer with memory fallback
│   └── vite.ts            # Development server integration
└── shared/                # Shared types and schemas
    └── schema.ts          # Drizzle database schema
```

### Authentication & User Management
- User schema defined with username/password fields
- Memory-based storage implementation with interface for easy database integration
- Prepared for session-based authentication

### API Architecture
- RESTful API design with `/api` prefix
- Centralized error handling middleware
- Request/response logging for development
- CORS and credential support configured

## Data Flow

### Client-Server Communication
1. Frontend makes HTTP requests using fetch API through custom `apiRequest` helper
2. TanStack Query manages caching, loading states, and error handling
3. Backend Express routes process requests and interact with storage layer
4. Responses are JSON-formatted with consistent error handling

### Database Integration
1. Drizzle schema defines table structures with TypeScript types
2. Storage interface abstracts database operations
3. Current implementation uses in-memory storage with plans for PostgreSQL integration
4. Migration system ready for schema evolution

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Routing**: wouter
- **State Management**: @tanstack/react-query
- **UI Components**: @radix-ui/* components, shadcn/ui
- **Styling**: tailwindcss, class-variance-authority, clsx
- **Forms**: react-hook-form, @hookform/resolvers
- **Utilities**: date-fns, nanoid

### Backend Dependencies
- **Server**: express
- **Database**: @neondatabase/serverless, drizzle-orm, drizzle-zod
- **Session**: express-session, connect-pg-simple
- **Development**: tsx, vite, esbuild

### Development Tools
- **TypeScript**: Full type safety across the stack
- **Vite**: Fast development server with HMR
- **ESBuild**: Production bundling for server code
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Build Process
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Shared schemas and types are included in both builds

### Environment Configuration
- Database URL configured via `DATABASE_URL` environment variable
- Development and production modes supported
- Replit-specific integrations for cloud development

### Production Deployment
- Node.js application serving both API and static files
- PostgreSQL database requirement (Neon Database recommended)
- Session storage persisted in database
- Error handling and logging configured for production

## User Preferences
Preferred communication style: Simple, everyday language.

## Changelog
- July 03, 2025. Initial setup
- July 03, 2025. Completed Figma to Replit migration with PayPal authentication UI
- July 03, 2025. Implemented mobile responsive design for all devices
- July 03, 2025. Added German localization for UI text
- July 03, 2025. Enhanced OTP input with digit-only validation