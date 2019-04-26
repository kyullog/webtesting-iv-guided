const server = require("./server.js");
const request = require("supertest");
const db = require("../data/dbConfig.js");

describe("the server", () => {
  it("should set testing environment", () => {
    const env = process.env.DB_ENV;

    expect(env).toBe("testing");
  });

  describe("GET /", () => {
    it("should return status 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/");

      expect(res.type).toBe("application/json");
    });

    it('should return { api: "up"}', async () => {
      const res = await request(server).get("/");

      expect(res.body).toEqual({ api: "up" });
    });
  });
  describe("GET /hobbits", () => {
    beforeEach(() => {
      return db("hobbits").truncate();
    });

    it("should return an empty array when there are no hobbits", async () => {
      const res = await request(server).get("/hobbits");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual([]);
    });

    it("should respond with all of the hobbits in the Database", async () => {
      //arrange
      await db("hobbits").insert([
        { name: "Samwise" },
        { name: "Frodo" },
        { name: "Bilbo" }
      ]);

      //act
      const res = await request(server).get("/hobbits");

      //assert
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body.length).toBe(3);
      expect(res.body[1].name).toBe("Frodo");
      expect(res.body[2].id).toBe(3);
    });
  });
});
