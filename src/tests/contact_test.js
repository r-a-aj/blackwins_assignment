const request = require("supertest");
const app = require("../server");

describe("Contact API Tests", () => {
  test("GET /api/contacts - should return all contacts", async () => {
    const res = await request(app).get("/api/contacts");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
