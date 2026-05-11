const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByUsername, findUserById, createUser } = require("../users");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");
const { jwtAuth } = require("../middleware/jwtAuth");

const router = express.Router();

const MIN_PASSWORD_LEN = 6;

function issueToken(user) {
  return jwt.sign(
    { username: user.username },
    JWT_SECRET,
    { subject: user.id, expiresIn: JWT_EXPIRES_IN }
  );
}

router.post("/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required" });
  }
  if (String(username).trim().length < 2) {
    return res.status(400).json({ error: "username must be at least 2 characters" });
  }
  if (String(password).length < MIN_PASSWORD_LEN) {
    return res.status(400).json({ error: `password must be at least ${MIN_PASSWORD_LEN} characters` });
  }

  const result = createUser(username, password);
  if (result.error === "username_taken") {
    return res.status(409).json({ error: "Username already registered" });
  }

  const { user } = result;
  const token = issueToken(user);
  return res.status(201).json({
    id: user.id,
    username: user.username,
    token,
    tokenType: "Bearer",
    expiresIn: JWT_EXPIRES_IN,
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required" });
  }

  const user = findUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = issueToken(user);
  return res.json({
    token,
    tokenType: "Bearer",
    expiresIn: JWT_EXPIRES_IN,
  });
});

router.get("/me", jwtAuth, (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json({ id: user.id, username: user.username });
});

module.exports = router;
