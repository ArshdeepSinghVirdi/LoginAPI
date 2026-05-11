const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRoutes);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

module.exports = { createApp };
