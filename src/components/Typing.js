import React, { useState, useEffect } from "react";

const Typing = ({ scrambleWord, oriWords }) => {
  const myArray = scrambleWord.split(" ");
  let word = "";
  const checkAns = (e) => {
    let test = document.getElementsByClassName("alphaLetter");
    let count = 0;
    for (let i = 0; i < oriWords.length; i++) {
      if (test[i].value !== oriWords[i]) {
        if (oriWords[i] === " ") {
          test[i].style.background = " #ffb74d";
        } else {
          test[i].style.background = "#e1e1e1";
        }
      } else {
        test[i].style.background = "#4caf50";
        count = count + 1;
      }
    }
    if (count == oriWords.length) {
      console.log("djdiaosjdioasjdoiajdsoi");
      $(".button").show();
      $(".button").focus();
    }
  };
  const nextInput = (e) => {
    let myLength = e.target.value.length;
    if (myLength == 1) {
      if (e.target.classList.contains("space")) {
        $(e.target).parent().next().children().first().focus();
        //.css({ backgroundColor: "red", border: "2px solid red" });
      } else {
        $(e.target).next().focus();
        // if ($(e.target).is("last-element")) {
        //   $(".button").focus();
        // }
      }
    } else if (myLength == 0 && (e.keyCode == 8 || e.keyCode == 46)) {
      if ($(e.target).is(":first-child")) {
        console.log("running");
        $(e.target)
          .parent()
          .prev()
          .children()
          .last()
          .focus()
          .val("")
          .css({ backgroundColor: "#ffb74d" });
        //.css({ backgroundColor: "red", border: "2px solid red" });
      } else {
        console.log("rinnn");
        $(e.target).prev().focus().val("").css({ backgroundColor: "#e1e1e1" });
      }
    }
  };
  const generateBox = (d, idx) => {
    word = d.split("");
    word.push(" ");
    var rows = [];
    for (let i = 0; i < word.length; i++) {
      if (i != word.length - 1) {
        rows.push(
          <input
            type="text"
            className="alphaLetter"
            maxLength="1"
            key={i}
            onInput={() => {
              checkAns();
            }}
            onKeyUp={(e) => {
              nextInput(e);
            }}
          ></input>
        );
      } else {
        if (idx !== myArray.length - 1) {
          rows.push(
            <input
              type="text"
              className="alphaLetter space"
              maxLength="1"
              key={i}
              onInput={() => {
                checkAns();
              }}
              onKeyUp={(e) => {
                nextInput(e);
              }}
            ></input>
          );
        }
      }
    }
    return rows;
  };

  return (
    <div className="typing">
      {myArray.map((d, idx) => {
        return (
          <div className="rowForEachWord " key={idx}>
            {generateBox(d, idx)}
          </div>
        );
      })}
    </div>
  );
};

export default Typing;
