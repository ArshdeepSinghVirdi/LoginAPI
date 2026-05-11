const bcrypt = require("bcryptjs");

const DEMO_PASSWORD_HASH = bcrypt.hashSync("password123", 10);

const usersByUsername = {
  demo: {
    id: "1",
    username: "demo",
    passwordHash: DEMO_PASSWORD_HASH,
  },
};

let nextId = 2;

function findUserByUsername(username) {
  return usersByUsername[String(username).toLowerCase()] || null;
}

function findUserById(id) {
  const match = Object.values(usersByUsername).find((u) => u.id === String(id));
  return match || null;
}

function createUser(username, password) {
  const key = String(username).toLowerCase();
  if (usersByUsername[key]) {
    return { error: "username_taken" };
  }
  const user = {
    id: String(nextId++),
    username: String(username).trim(),
    passwordHash: bcrypt.hashSync(password, 10),
  };
  usersByUsername[key] = user;
  return { user };
}

module.exports = { findUserByUsername, findUserById, createUser };
