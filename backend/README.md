# Task Manager Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm run dev
```

The server will run on port 5000.

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks (Protected)
- GET `/api/tasks` - Get all user tasks
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Project Structure
- `models/` - Mongoose models (User, Task)
- `routes/` - Express routes (auth, tasks)
- `middleware/` - Custom middleware (auth)
- `server.js` - Main server file
