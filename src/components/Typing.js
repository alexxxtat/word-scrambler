import React from "react";
const Typing = ({ scrambleWord, oriWords }) => {
  const scrambleWordArray = scrambleWord.split(" ");
  const checkAns = (e) => {
    let alphaLetter = document.getElementsByClassName("alphaLetter");
    let count = 0;
    for (let i = 0; i < oriWords.length; i++) {
      if (alphaLetter[i].value !== oriWords[i]) {
        //alpha letter not correctly match
        if (oriWords[i] === " ") {
          alphaLetter[i].style.color = "black";
          alphaLetter[i].style.background = " #ffb74d";
        } else {
          alphaLetter[i].style.color = "black";
          alphaLetter[i].style.background = "#e1e1e1";
        }
      } else {
        //match correclty
        alphaLetter[i].style.color = "white";
        alphaLetter[i].style.background = "#4caf50";
        count = count + 1;
      }
    }
    //show button if matched all
    if (count == oriWords.length) {
      $(".button").show().focus();
    }
  };
  const nextInput = (e) => {
    //move to the next box after typing
    let myLength = e.target.value.length;
    if (myLength == 1) {
      if (e.target.classList.contains("space")) {
        //jumped to the next row
        $(e.target).parent().next().children().first().focus();
      } else {
        $(e.target).next().focus();
      }
    }
  };
  //sepreated to nextInput and prevInput in case of mouse click in the box with letter already causing delete 2 letter;
  const prevInput = (e) => {
    let myLength = e.target.value.length;
    if (e.keyCode == 8) {
      $(".button").hide();
      //handle mouse click to other typing box with no typing before
      if (myLength == 0) {
        if ($(e.target).is(":first-child")) {
          //move to the prev row
          $(e.target)
            .parent()
            .prev()
            .children()
            .last()
            .focus()
            .val("")
            .css({ backgroundColor: "#ffb74d" });
        } else {
          //move to the prev box in same row
          $(e.target)
            .prev()
            .focus()
            .val("")
            .css({ backgroundColor: "#e1e1e1" });
        }
      } else if (myLength == 1) {
        //handle mouse click to other typing box with something typed before
        if ($(e.target).is(":first-child")) {
          //move to prev row
          $(e.target)
            .parent()
            .children()
            .last()
            .focus()
            .val("")
            .css({ backgroundColor: "#ffb74d" });
        } else {
          //move to prev typing box
          $(e.target).focus().val("").css({ backgroundColor: "#e1e1e1" });
        }
      }
    }
  };
  const generateBox = (d, idx) => {
    let word = "";
    word = d.split("");
    word.push(" ");
    const rows = [];
    for (let i = 0; i < word.length; i++) {
      if (i != word.length - 1) {
        //for alpha letter, not space
        rows.push(
          <input
            type="text"
            className="alphaLetter"
            maxLength="1"
            key={i} //updating using index will not rerendering all the other elements
            onInput={() => {
              checkAns();
            }}
            onKeyUp={(e) => {
              nextInput(e);
            }}
            onKeyDown={(e) => {
              prevInput(e);
            }}
          ></input>
        );
      } else {
        // for space, last row dont need to add a space
        if (idx !== scrambleWordArray.length - 1) {
          rows.push(
            <input
              type="text"
              className="alphaLetter space"
              maxLength="1"
              key={i} //updating using index will not rerendering all the other elements
              onInput={() => {
                checkAns();
              }}
              onKeyUp={(e) => {
                nextInput(e);
              }}
              onKeyDown={(e) => {
                prevInput(e);
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
      {scrambleWordArray.map((d, idx) => {
        return (
          //no additions/re-ordering/removal to the list) => using idx as key
          <div className="rowForEachWord " key={idx}>
            {generateBox(d, idx)}
          </div>
        );
      })}
    </div>
  );
};

export default Typing;
