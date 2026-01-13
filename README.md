# Task Manager - Kanban Board

A full-stack task management application with a Kanban-style interface for organizing tasks. Built with React, Node.js, Express, and MongoDB.


## Tech Stack

- **Frontend**: React 18, React Router, Axios, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)

## Features

- User registration and login with JWT authentication
- User profile management (update and delete)
- Task CRUD operations
- Kanban board with three columns: Pending, In Progress, Completed
- Drag and drop tasks between columns
- Task filtering by status
- Mobile responsive design

## Project Structure

```
kanban-task-manager/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helper functions
│   ├── tests/              # API tests
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service
│   │   └── styles/         # CSS files
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
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

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kanban_taskmanager
   JWT_SECRET=your_strong_secret_key_here
   JWT_EXPIRES_IN=7d
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

### Backend

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/kanban_taskmanager |
| JWT_SECRET | Secret key for JWT tokens | your_strong_secret_key |
| JWT_EXPIRES_IN | Token expiry duration | 7d |

### Frontend

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |

#### Signup Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
    "token": "jwt_token_here"
  }
}
```

### User Profile (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/profile | Get current user profile |
| PUT | /api/users/profile | Update profile |
| DELETE | /api/users/profile | Delete account |

### Tasks (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks?status=pending | Filter tasks by status |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| PATCH | /api/tasks/:id/status | Update task status |
| DELETE | /api/tasks/:id | Delete task |

#### Create Task Request
```json
{
  "title": "Complete project",
  "description": "Finish the kanban board",
  "dueDate": "2024-01-20",
  "status": "pending"
}
```

#### Task Response
```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "...",
      "title": "Complete project",
      "description": "Finish the kanban board",
      "status": "pending",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "user": "...",
      "createdAt": "..."
    }
  }
}
```

## Error Handling

All API errors return consistent JSON format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

Common HTTP status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 404: Not Found
- 500: Server Error

## Running Tests

```bash
cd backend
npm test
```
Demo
Sign in Page
<img width="1531" height="906" alt="Screenshot 2026-01-13 204108" src="https://github.com/user-attachments/assets/ae777dc9-8534-4a8a-8283-d43042f7861c" />
Sign Up Page
<img width="1919" height="910" alt="Screenshot 2026-01-13 204251" src="https://github.com/user-attachments/assets/8b31d262-df34-4781-a791-068827eead4c" />
Task Board
<img width="1916" height="909" alt="Screenshot 2026-01-13 204221" src="https://github.com/user-attachments/assets/f5a9a192-e026-4691-ab59-a73596e09c30" />
Profile
<img width="1919" height="911" alt="Screenshot 2026-01-13 204230" src="https://github.com/user-attachments/assets/9e3c1740-ef63-436d-a5be-281be04ef010" />




