#Login API (JWT Auth)
Simple Express REST API for user registration, login, and a protected “me” endpoint using JWT.

#Endpoints
*POST /api/auth/register
Body: { "username": "...", "password": "..." }
Returns: 201 user info + token
POST /api/auth/login
Body: { "username": "...", "password": "..." }
Returns: 200 token
GET /api/auth/me
Header: Authorization: Bearer <token>
Returns: 200 { id, username }
Demo credentials
Username: demo
Password: password123
Run locally

npm install
npm start
Server: http://localhost:3000

Docker

docker compose up --build
Tests

npm test
