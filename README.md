# Task Manager

Task management application built with **Next.js 16**, **React 19**, **TypeScript** and **Zustand**, following a **hexagonal + vertical slice** architecture.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **State Management:** Zustand 5
- **Testing:** Jest 30 + React Testing Library
- **Language:** TypeScript 5

## Prerequisites

- Node.js >= 18
- npm >= 9

## Installation

```bash
git clone https://github.com/AiledViv20/seekglobal-technical-test.git
cd seekglobal-technical-test
npm install
```

## Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Accounts

The application uses simulated JWT authentication. You can log in with the following credentials:

| User | Email | Password |
|------|-------|----------|
| Alex Rodriguez | `alex@taskmanager.com` | `password123` |
| Carlos Gutierrez | `carlos@taskmanager.com` | `password123` |

## Testing

```bash
# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

### Coverage

| Metric | Percentage |
|--------|-----------|
| Statements | 99.59% |
| Branches | 95.52% |
| Functions | 94.33% |
| Lines | 99.59% |

## Architecture

The project follows a **hexagonal** architecture combined with **vertical slice**, organizing code by business modules:

```
modules/
├── auth/                    # Authentication module
│   ├── domain/              # Interfaces and business logic (User, AuthToken, AuthRepository)
│   ├── application/         # Use cases (Authenticator)
│   ├── infrastructure/      # Concrete implementations (MockAuthRepository)
│   └── hooks/               # Zustand store (useAuth)
└── tasks/                   # Tasks module
    ├── domain/              # Interfaces and types (Task, TaskRepository)
    ├── application/         # Use cases (TaskFinder, TaskCreator, TaskUpdater, TaskDeleter)
    ├── infrastructure/      # Concrete implementations (MockTaskRepository)
    └── hooks/               # Zustand store (useTasks)

components/
├── auth/                    # Authentication components (LoginForm)
├── shared/                  # Shared components (Header, Sidebar)
└── tasks/                   # Task components (TaskBoard, TaskCard, TaskModal, etc.)
```

### Layers

- **Domain:** Interfaces, types and pure business logic. No external dependencies.
- **Application:** Use cases that orchestrate business logic. Depend only on the domain layer.
- **Infrastructure:** Concrete implementations of repositories with mock data.
- **Hooks:** Zustand stores that connect the application layer with React components.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:coverage` | Tests with coverage |
