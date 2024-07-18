import { useState, useEffect } from "react";
import Character from "./Character.js";
import { getNewCharacter } from "../Utils/utils.js";

const USERNAME = "jay-mandaliya";

function CharacterSheet() {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = () => {
    fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/{${USERNAME}}/character`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200 && result.body?.characters) {
          setCharacters(result.body?.characters);
        }
      });
  };

  function handleSaveCharacters() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/{${USERNAME}}/character`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ characters: characters }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) alert("Data Saved");
      });
  }

  function handleAddCharacter() {
    characters.push(getNewCharacter());
    setCharacters([...characters]);
  }

  function handleCharacterUpdate(index, character) {
    characters[index] = character;
    setCharacters([...characters]);
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="container">
      <span>
        <button onClick={handleAddCharacter}>
          <h3>Add New Character</h3>
        </button>
      </span>

      <span>
        <button onClick={handleSaveCharacters}>
          <h3>Save Characters</h3>
        </button>
      </span>

      {characters.map((character, index) => {
        return (
          <Character
            key={index}
            data={character}
            index={index}
            onCharacterUpdate={handleCharacterUpdate}
          />
        );
      })}
    </div>
  );
}

export default CharacterSheet;
