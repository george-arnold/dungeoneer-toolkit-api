const express = require("express");
const CharactersService = require("./characters-service");
const bodyParser = express.json();
const { requireAuth } = require("../jwt-auth");
const charactersRouter = express.Router();

const serializeCharacter = (character) => ({
  id: character.id,
  name: character.name,
  level: character.level,
  role: character.role,
  hp: character.hp,
  strength: character.strength,
  dexterity: character.dexterity,
  constitution: character.constitution,
  intelligence: character.intelligence,
  wisdom: character.wisdom,
  charisma: character.charisma,
  imageURL: character.imageURL,
});

//needed by the character library to get all characters names
charactersRouter
  .route("/characters")
  .all(requireAuth)
  .get((req, res, next) => {
    CharactersService.getAllCharacters(req.app.get("db"))
      .then((characters) => {
        res.status(200).json(characters.map(serializeCharacter));
      })
      .catch(next);
  });

charactersRouter
  .route("/characters/:characterId")
  .all(requireAuth)
  .get((req, res, next) => {
    //gets a specific character of id in params
    const { characterId } = req.params;
    CharactersService.getCharacterById(req.app.get("db"), characterId)
      .then((character) => {
        if (!character) {
          return res.status(404).json({
            error: { message: `character does not exist` },
          });
        }
        res.json(serializeCharacter(character));
        next();
      })
      .catch(next);
  })

  .patch(bodyParser, (req, res, next) => {
    // deconstruct all keys
    const {
      name,
      level,
      role,
      hp,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    } = req.body;
    //construct character object
    const characterToUpdate = {
      name,
      level,
      role,
      hp,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    };
    const { characterId } = req.params;
    CharactersService.updateCharacter(
      req.app.get("db"),
      characterId,
      characterToUpdate
    )
      .then((numRowsAffected) => {
        console.log(numRowsAffected);
        res.status(200).json({ info: { numRowsAffected: numRowsAffected } }),
          end();
      })
      .catch(next);
  });

module.exports = charactersRouter;
