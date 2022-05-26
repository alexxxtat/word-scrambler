import React, { useState, useEffect } from "react";
import Typing from "../components/Typing";
import Score from "../components/Score";
//import Win from "../components/Win";
const Homepage = () => {
  let [question, setQuestion] = useState(1);
  let [oriWords, setOriWords] = useState("");
  let [scrambleWord, setScrambleWord] = useState("");
  let [score, setScore] = useState(0);

  const search = async () => {
    let URL = "https://api.hatchways.io/assessment/sentences/" + question;
    let unparsedData = await fetch(URL, { method: "GET" });
    let parsedData = await unparsedData.json();
    setOriWords(parsedData.data.sentence);
  };

  const getRandomInt = (n) => {
    return Math.floor(Math.random() * n);
  };
  const shuffle = (s) => {
    let arr = s.split("");
    let n = arr.length;
    for (let i = 1; i < n - 1; i++) {
      let j = getRandomInt(n - 2) + 1;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    s = arr.join("");
    return s;
  };

  const scramble = () => {
    let text = oriWords;
    console.log(text);
    if (typeof text === "string") {
      const myArray = text.split(" ");
      //console.log(myArray);
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].length > 2) {
          let randomWord = shuffle(myArray[i]);
          myArray[i] = randomWord;
        }
      }
      const wordWithSpaces = myArray.join(" ");
      setScrambleWord(wordWithSpaces);
    }
  };
  const updateQuestion = async () => {
    setQuestion(question + 1);
    setScore(score + 1);
  };
  useEffect(() => {
    search();
    $(".button").hide();
  }, []);

  useEffect(() => {
    scramble();
    console.log(oriWords);
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
          <Score score={score} setScore={setScore} />
          <Typing scrambleWord={scrambleWord} oriWords={oriWords} />
          <button
            onClick={(e) => {
              console.log("dllm");
              updateQuestion();
            }}
            onInput={(e) => {
              if (e.keyCode === 13) {
                updateQuestion();
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
