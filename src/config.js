require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";
const PORT = Number(process.env.PORT) || 3000;

module.exports = { JWT_SECRET, JWT_EXPIRES_IN, PORT };
