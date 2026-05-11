const request = require("supertest");
const { createApp } = require("../src/app");

describe("Login API", () => {
  const app = createApp();

  describe("POST /api/auth/register", () => {
    it("creates a user and returns JWT", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ username: "newuser_ci", password: "secret12" });

      expect(res.status).toBe(201);
      expect(res.body.username).toBe("newuser_ci");
      expect(res.body.token).toBeDefined();
      expect(res.body.tokenType).toBe("Bearer");
    });

    it("returns 400 when password is too short", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ username: "x", password: "12345" });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("returns JWT for valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "demo", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.tokenType).toBe("Bearer");
      expect(res.body.expiresIn).toBeDefined();
    });

    it("returns 401 for invalid password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "demo", password: "wrong" });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid credentials");
    });
  });

  describe("GET /api/auth/me (protected)", () => {
    it("returns 401 without token", async () => {
      const res = await request(app).get("/api/auth/me");
      expect(res.status).toBe(401);
    });

    it("returns profile when Bearer token is valid", async () => {
      const login = await request(app)
        .post("/api/auth/login")
        .send({ username: "demo", password: "password123" });

      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${login.body.token}`);

      expect(res.status).toBe(200);
      expect(res.body.username).toBe("demo");
      expect(res.body.id).toBeDefined();
    });
  });
});
