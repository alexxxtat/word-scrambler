import React, { useState, useEffect } from "react";
import Typing from "../components/Typing";
import Score from "../components/Score";

const Homepage = () => {
  const [question, setQuestion] = useState(1);
  const [oriWords, setOriWords] = useState("");
  const [scrambleWord, setScrambleWord] = useState("");
  const [score, setScore] = useState(0);

  const search = async () => {
    const URL = "https://api.hatchways.io/assessment/sentences/" + question;
    const unparsedData = await fetch(URL, { method: "GET" });
    const parsedData = await unparsedData.json();
    setOriWords(parsedData.data.sentence);
  };
  const getRandomInt = (n) => {
    return Math.floor(Math.random() * n);
  };
  const shuffle = (s) => {
    //only shuffle string index from 1 to n-1, not for the first and last idx;
    const arr = s.split("");
    const n = arr.length;
    for (let i = 1; i < n - 1; i++) {
      const j = getRandomInt(n - 2) + 1;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    s = arr.join("");
    return s;
  };
  const scramble = () => {
    const text = oriWords;
    if (typeof text === "string") {
      const myArray = text.split(" ");
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].length > 3) {
          //only shuffle when the length = 3 ( because the middle will be remain the same)
          const randomWord = shuffle(myArray[i]);
          myArray[i] = randomWord;
        }
      }
      const wordWithSpaces = myArray.join(" ");
      setScrambleWord(wordWithSpaces);
    }
  };
  const handleButtonClick = () => {
    setQuestion(question + 1);
    setScore(score + 1);
  };

  useEffect(() => {
    search();
  }, []);
  useEffect(() => {
    scramble();
  }, [oriWords]);
  useEffect(() => {
    search();
  }, [question]);
  useEffect(() => {
    $(".alphaLetter").first().focus();
    $(".alphaLetter").val("");
    $(".alphaLetter").css({ backgroundColor: "#e1e1e1" });
    $(".space").css({ backgroundColor: "#ffb74d" });
    $(".button").hide();
  }, [scrambleWord]);

  return (
    <div className="homepage">
      {score >= 10 ? (
        <div className="win">
          <p>You win!</p>
        </div>
      ) : (
        <div className="container">
          <p className="scrambleWord">{scrambleWord}</p>
          <p className="instruction">Guess the sentencel Starting typing </p>
          <p className="instruction">The yellow blocks are meant for spaces </p>
          <Score score={score} />
          <Typing scrambleWord={scrambleWord} oriWords={oriWords} />
          <button
            onClick={(e) => {
              handleButtonClick();
            }}
            onInput={(e) => {
              if (e.keyCode === 13) {
                handleButtonClick();
              }
            }}
            className="button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
