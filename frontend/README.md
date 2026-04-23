# Task Manager Frontend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variable:
```
VITE_API_BASE_URL=http://localhost:5000
```

3. Make sure the backend server is running on port 5000

4. Start the development server:
```bash
npm run dev
```

The application will run on port 3000.

## Features

- User registration and login
- JWT-based authentication
- Task management (create, read, update, delete)
- Responsive design
- Clean and minimal UI

## Project Structure
- `src/pages/` - React components (Register, Login, Dashboard)
- `src/App.jsx` - Main app component with routing
- `src/main.jsx` - Entry point
- `src/index.css` - Global styles

## Technologies Used
- React 18
- React Router DOM
- Axios for API calls
- Vite for build tool
