const CharactersService = {
  getAllCharacters(knex) {
    return knex.select("*").from("characters");
  },
  insertCharacter(knex, newCharacter) {
    return knex
      .insert(newCharacter)
      .into("Characters")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getCharacterById(knex, CharacterId) {
    return knex.from("Characters").select("*").where("id", CharacterId).first();
  },
  deleteCharacter(knex, id) {
    return knex("Characters").where({ id }).delete();
  },
  updateCharacter(knex, id, newCharacter) {
    return knex("Characters").where({ id }).update(newCharacter);
  },
};

module.exports = CharactersService;
