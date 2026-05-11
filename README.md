# Login API (JWT Auth)

A simple Express REST API providing secure user registration, login authentication, and a protected user profile route using JSON Web Tokens (JWT).

##  Endpoints

### Register User
*   **Method / Route:** `POST /api/auth/register`
*   **Request Body:**
    ```json
    {
      "username": "...",
      "password": "..."
    }
    ```
*   **Response:** `201 Created` (Returns user info and generated token)

### Login User
*   **Method / Route:** `POST /api/auth/login`
*   **Request Body:**
    ```json
    {
      "username": "...",
      "password": "..."
    }
    ```
*   **Response:** `200 OK` (Returns authentication token)

### Get Current User Profile (Protected)
*   **Method / Route:** `GET /api/auth/me`
*   **Required Header:** `Authorization: Bearer <token>`
*   **Response:** `200 OK` 
    ```json
    {
      "id": "...",
      "username": "..."
    }
    ```

---

##  Demo Credentials

To test the authentication endpoints immediately, use the following account:
*   **Username:** `demo`
*   **Password:** `password123`

---

##  Run Locally

Follow these quick steps to get the server running on your machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm start
   ```

The local development server will be active and listening at: **http://localhost:3000**


Docker

docker compose up --build


npm test
