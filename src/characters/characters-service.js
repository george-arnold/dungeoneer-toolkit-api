const CharactersService = {
  getAllCharacters(knex) {
    return knex.select("*").from("characters");
  },
  insertCharacter(knex, newCharacter) {
    return knex
      .insert(newCharacter)
      .into("characters")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getCharacterById(knex, characterId) {
    return knex.from("characters").select("*").where("id", characterId).first();
  },
  deleteCharacter(knex, id) {
    return knex("characters").where({ id }).delete();
  },
  updateCharacter(knex, id, newCharacter) {
    return knex("characters").where({ id }).update(newCharacter);
  },
};

module.exports = CharactersService;
