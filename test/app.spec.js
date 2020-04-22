const app = require("../src/app");
const knex = require("knex");
const supertest = require("supertest");
const { expect } = require("chai");

describe("characters endpoints", () => {
  let db;
  let testCharacter = {
    id: 0,
    name: "Aragorn",
    level: 10,
    role: "Warrior",
    hp: 100,
    strength: 18,
    dexterity: 16,
    constitution: 14,
    intelligence: 14,
    wisdom: 16,
    charisma: 20,
  };
  let patchCharacter = {
    id: 0,
    name: "Conan",
    level: 15,
    role: "Brute",
    hp: 200,
    strength: 10,
    dexterity: 10,
    constitution: 18,
    intelligence: 10,
    wisdom: 10,
    charisma: 12,
  };
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });
  after(() => db.destroy());

  describe(`GET /api/characters`, () => {
    it("responds with 200", () => {
      return supertest(app).get("/api/characters").expect(200);
    });
    // future implementation:
    //it("responds with 201 on post request", () => {
    //   return supertest(app)
    //     .post("/api/characters")
    //     .send({
    //       testCharacter,
    //     })
    //     .expect(201);
    // });

    it("responds 200 to specific character of test character id GET", () => {
      return supertest(app).get("/api/character/0").expect(200);
    });

    it("responds 200 on PATCH", () => {
      return supertest(app)
        .patch("/api/character/0")
        .send({ patchCharacter })
        .expect(200);
    });
    // future implementation:
    //it("responds 204 with delete reqest", () => {
    //   return supertest(app).delete("api/character/0").expect(204);
    // });
  });
});
