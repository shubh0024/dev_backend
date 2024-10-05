
# MERN Stack Backend Server

This repository contains the backend server for the youtube-clone. It is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The server handles API requests, manages the MongoDB database, and provides various endpoints for features such as authentication and CRUD operations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization (JWT-based)
- CRUD operations for [specific resources]
- RESTful API for interacting with the frontend
- Integration with third-party APIs (if any)
- Error handling and validation
- [Any other major features]

## Technologies Used

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Frontend:** React.js (if part of the same project)
- **Authentication:** JWT (JSON Web Token)
- **Other Libraries/Tools:**
  - Mongoose (ORM for MongoDB)
  - Bcrypt (for password hashing)
  - Dotenv (for environment variable management)
  - Nodemon (for development server)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate to the backend folder:

   ```bash
   cd backend
   ```

3. Install server dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=8000
MONGODB_URI=
DB_NAME=
CORS_ORIGIN=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Running the Server

1. Start the server in development mode:

   ```bash
   npm run dev
   ```

   This will start the backend on `http://localhost:5000`.

2. For production:

   ```bash
   npm start
   ```

## API Endpoints

- **Base URL:** `http://localhost:5000/api`

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in a user

### Example 

- **GET** `/api/v1/users` - Get all resources
- **POST** `/api/v1/new` - Create a new resource
- **PUT** `/api/v1/:id` - Update a resource by ID
- **DELETE** `/api/v1/:id` - Delete a resource by ID



## Database Schema

The backend uses MongoDB to store data, with Mongoose for modeling the database. Key models include:

- **User:**
  - `id`: String (UUID)
  - `name`: String
  - `email`: String
  - `password`: String (hashed)
  - `createdAt`: Date



## Testing

To run tests:

```bash
npm test
```

## Contributing

Contributions are welcome! If you'd like to contribute, fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


