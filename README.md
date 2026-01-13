# Task Manager - Kanban Board

A full-stack task management application with a Kanban-style interface for organizing tasks.

## Tech Stack

- **Frontend**: React, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Project Structure

```
kanban-task-manager/
├── backend/
│   ├── src/
│   │   ├── config/      # Database and app config
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/  # Auth and error handling
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Helper functions
│   │   └── validators/  # Input validation
│   ├── tests/           # API tests
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   ├── context/     # React context
│   │   ├── services/    # API calls
│   │   └── styles/      # CSS files
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB URI and JWT secret

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:5000`

### Frontend Setup

(Instructions will be added once frontend is set up)

## Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| JWT_EXPIRES_IN | Token expiry time (e.g., 7d) |

## API Endpoints

(Will be documented as endpoints are implemented)

## Features

- [ ] User authentication (signup, login, logout)
- [ ] User profile management
- [ ] Task CRUD operations
- [ ] Kanban board with drag and drop
- [ ] Task filtering by status
- [ ] Mobile responsive design

## License

MIT
