# Sweet Management System API

A backend API for managing a sweet shop inventory.

## Features

- User Authentication (register, login)
- Sweets Management (CRUD operations)
- Inventory Management (purchase, restock)
- Role-based Access Control (admin vs regular users)

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up your PostgreSQL database and update the `.env` file.

3. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and get JWT token

### Sweets (Protected)
- `POST /api/sweets`: Add a new sweet
- `GET /api/sweets`: View all available sweets
- `GET /api/sweets/search`: Search for sweets by name, category, or price range
- `PUT /api/sweets/:id`: Update a sweet's details
- `DELETE /api/sweets/:id`: Delete a sweet (Admin only)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase`: Purchase a sweet
- `POST /api/sweets/:id/restock`: Restock a sweet (Admin only)
