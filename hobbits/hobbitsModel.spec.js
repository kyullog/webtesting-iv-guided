const Hobbits = require("./hobbitsModel.js");
const db = require("../data/dbConfig.js");

describe("The Hobbit Model", () => {
  beforeEach(() => {
    return db("hobbits").truncate();
  });
  describe("the insert function", () => {
    it("should instert a single hobbit into the database", async () => {
      await Hobbits.insert({ name: "Frodo" });
      const hobbits = await db("hobbits");
      expect(hobbits.length).toBe(1);
      expect(hobbits[0].name).toBe("Frodo");
    });
    it("should return the inserted hobbit and it's id", async () => {
      const newHobbit = await Hobbits.insert({ name: "Sam" });
      expect(newHobbit.id).toBe(1);
      expect(newHobbit.name).toBe("Sam");
    });
  });

  describe("the get all function", () => {
    it("should retrieve all hobbits in DB", async () => {
      await db("hobbits").insert([{ name: "Sam" }, { name: "Frodo" }]);
      const hobbits = await Hobbits.getAll();
      expect(hobbits.length).toEqual(2);
      expect(hobbits[0].name).toEqual("Sam");
      expect(hobbits[1].id).toEqual(2);
    });
  });
});
