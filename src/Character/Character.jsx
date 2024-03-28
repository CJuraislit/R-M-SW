import { useEffect, useRef, useState } from "react";
import "./Character.css";
import { getRandomHexColor, getRandomElementOfArray } from "./utilits";
import { API_URL } from "./consts";

const Character = () => {
  const [visibilty, setVisibilty] = useState(true);

  if (!visibilty) {
    return null;
  }

  return <CharacterContent setVisibilty={setVisibilty} />;
};

const CharacterContent = ({ setVisibilty }) => {
  const intervalRef = useRef(undefined);
  const [character, setCharacter] = useState({ name: "Undefined" });
  const randomColor = getRandomHexColor();

  useEffect(() => {
    console.log("Component: Mount");
    getRandomCharacter();

    intervalRef.current = setInterval(() => {
      console.log("setInterval");
      getRandomCharacter();
    }, 3000);

    return () => {
      console.log("Component: Unmount");
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    console.log("Component: Render");
  });

  const getRandomCharacter = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const characters = data.results;
        const randomCharacter = getRandomElementOfArray(characters);
        setCharacter({ name: randomCharacter.name });
      });
  };

  const getRandomCharacterHandler = () => {
    getRandomCharacter();
  };

  const hideComponentHandler = () => {
    setVisibilty(false);
  };

  return (
    <>
      <button onClick={hideComponentHandler}>Hide Componrnt</button>
      <h2 className="Character" style={{ backgroundColor: randomColor }}>
        Character: {character.name}
      </h2>
      <button onClick={getRandomCharacterHandler}>Get Random Characer</button>
    </>
  );
};

export default Character;
