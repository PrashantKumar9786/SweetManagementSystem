# Sweet Management System

A full-stack application for managing a sweet shop inventory, including both backend API and frontend interface.

## Features

### Backend
- User Authentication (register, login)
- Sweets Management (CRUD operations)
- Inventory Management (purchase, restock)
- Role-based Access Control (admin vs regular users)
- MongoDB database integration

### Frontend
- Modern React SPA with TypeScript
- Material UI components for beautiful UI
- Responsive design for all device sizes
- JWT authentication flow
- Role-based interface (admin/user)

## Setup Instructions

### Backend Setup

1. Install backend dependencies:
   ```bash
   npm install
   ```

2. Set up your MongoDB connection in the `.env` file:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/sweet_management
   JWT_SECRET=your_jwt_secret_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   
   The API will be available at http://localhost:3000/api

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm start
   ```
   
   The frontend will be available at http://localhost:3000

## Architecture

```
├── frontend/               # React frontend application
│   ├── public/             # Static assets
│   └── src/                # React source code
└── src/                    # Backend API source code
    ├── config/             # Configuration files
    ├── controllers/        # API controllers
    ├── middleware/         # Express middleware
    ├── models/             # Data models
    │   └── schemas/        # MongoDB schemas
    ├── routes/             # API routes
    ├── types/              # TypeScript types
    └── utils/              # Utility functions
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and get JWT token
- `GET /api/auth/profile`: Get user profile (Protected)

### Sweets 
- `POST /api/sweets`: Add a new sweet (Protected)
- `GET /api/sweets`: View all available sweets
- `GET /api/sweets/search`: Search for sweets by name, category, or price range
- `GET /api/sweets/:id`: Get a specific sweet by ID
- `PUT /api/sweets/:id`: Update a sweet's details (Protected)
- `DELETE /api/sweets/:id`: Delete a sweet (Admin only)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase`: Purchase a sweet
- `POST /api/sweets/:id/restock`: Restock a sweet (Admin only)

## Screenshots
  **Admin Portal**
  <img width="1280" height="717" alt="image" src="https://github.com/user-attachments/assets/79e04954-129d-4898-bae8-e72cf7dcaa26" />
  <img width="820" height="620" alt="image" src="https://github.com/user-attachments/assets/cde6e9d0-52c0-4cf7-bbce-a1ab61af6c92" />
 Costumer Flow
  <img width="1071" height="1280" alt="image" src="https://github.com/user-attachments/assets/61cb2ae3-7a9e-4ce5-a1d4-81f7e1ce4ed2" />
  <img width="624" height="626" alt="image" src="https://github.com/user-attachments/assets/0fa3859f-f942-49b5-a594-e22900734c38" />


## Technologies Used

- **Backend**: Node.js, Express, TypeScript, MongoDB with Mongoose
- **Frontend**: React, TypeScript, Material UI, React Router
- **Authentication**: JWT (JSON Web Tokens)
- **Development**: Nodemon, TypeScript, ESLint
