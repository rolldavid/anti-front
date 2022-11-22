import { useState, useEffect } from "react";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";

import yes from "../../sounds/yes.mp3";
import thud from "../../sounds/thud.mp3";
import "./TrivGuessButton.css";
import {
  updateGuessStreak,
  updateStrikes,
  updatePracticeStrikes,
  updatePracticeGuessStreak,
  resetGuessStreak,
  resetPracticeGuessStreak,
  updateQuestionCount,
  updatePracticeQuestionCount,
} from "../actions";

let solution;

const TrivGuessButton = ({
  guessStreak,
  updateGuessStreak,
  resetGuessStreak,
  updatePracticeGuessStreak,
  updatePracticeStrikes,
  updateStrikes,
  resetPracticeGuessStreak,
  setQ,
  amount,
  setUserScore,
  guess,
  id,
  questionNumber,
  catNum,
  setShowModal,
  clearTime,
  altAnsw1,
  altAnsw2,
  altAnsw3,
  buttonStyle,
  setButton1Style,
  setButton2Style,
  setButton3Style,
  guessNumber,
  setCancelTimer,
  practice,
  bookmarkedGame,
  updateQuestionCount,
  updatePracticeQuestionCount,
}) => {
  const storedGame1 = JSON.parse(localStorage.getItem("game1"));
  const storedGame2 = JSON.parse(localStorage.getItem("game2"));
  const storedGame3 = JSON.parse(localStorage.getItem("game3"));

  const [buttonColor, setButtonColor] = useState();

  const soundData = JSON.parse(localStorage.getItem("sound"));
  const parseScore = JSON.parse(localStorage.getItem("score"));

  let ding = new Audio(yes);
  let wrong = new Audio(thud);

  const correctSound = () => {
    if (soundData) {
      if (soundData.soundStatus) {
        ding.volume = 0.2;
        ding.play();
      }
    } else {
      ding.volume = 0.2;
      ding.play();
    }
  };

  const wrongSound = () => {
    if (soundData) {
      if (soundData.soundStatus) {
        wrong.volume = 0.25;
        wrong.play();
      }
    } else {
      wrong.volume = 0.25;
      wrong.play();
    }
  };

  useEffect(() => {
    setButtonColor(buttonStyle);
  }, [buttonStyle]);

  const handleGuess = async () => {
    clearTime();
    const encodedSol = JSON.parse(localStorage.getItem("enc"));
    const bytes = CryptoJS.AES.decrypt(encodedSol.sol, "antitriv");
    solution = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    let isCorrect;
    if (solution === guess) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
    if (!practice && !bookmarkedGame) {
      showAnswer(isCorrect);
    } else {
      showPracticeAnswer(isCorrect);

      updatePracticeQuestionCount();
    }

    setCancelTimer(true);
  };

  const showAnswer = (isCorrect) => {
    if (isCorrect) {
      correctSound();
      if (guessNumber === "1") {
        setButton1Style("button-correct");
        updateGuessStreak();
      } else if (guessNumber === "2") {
        setButton2Style("button-correct");
        updateGuessStreak();
      } else if (guessNumber === "3") {
        setButton3Style("button-correct");
        updateGuessStreak();
      }
      setQ("category-select-winner");

      if (catNum === "1") {
        localStorage.setItem(
          "game1",
          JSON.stringify({
            ...storedGame1,
            [questionNumber]: "won",
          })
        );
      }
      if (catNum === "2") {
        localStorage.setItem(
          "game2",
          JSON.stringify({
            ...storedGame2,
            [questionNumber]: "won",
          })
        );
      }
      if (catNum === "3") {
        localStorage.setItem(
          "game3",
          JSON.stringify({
            ...storedGame3,
            [questionNumber]: "won",
          })
        );
      }
      setUserScore(amount);
      localStorage.setItem(
        "score",
        JSON.stringify({
          score: parseScore.score + amount,
        })
      );

      updateQuestionCount();

      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } else if (!isCorrect) {
      wrongSound();

      if (guessNumber === "1") {
        setButton1Style("button-incorrect");
        if (solution === altAnsw2) {
          setButton2Style("button-correct");
          //setButton3Style("button-incorrect")
        } else if (solution === altAnsw3) {
          setButton3Style("button-correct");
          //setButton2Style("button-incorrect")
        }
        setUserScore(-amount);

        resetGuessStreak();
      } else if (guessNumber === "2") {
        setButton2Style("button-incorrect");

        if (solution === altAnsw1) {
          setButton1Style("button-correct");
          //setButton3Style("button-incorrect")
        } else if (solution === altAnsw3) {
          setButton3Style("button-correct");
          //setButton1Style("button-incorrect")
        }
        setUserScore(-amount);

        resetGuessStreak();
      } else if (guessNumber === "3") {
        setButton3Style("button-incorrect");
        if (solution === altAnsw1) {
          setButton1Style("button-correct");
          //setButton2Style("button-incorrect")
        } else if (solution === altAnsw2) {
          setButton2Style("button-correct");
          //setButton1Style("button-incorrect")
        }

        setUserScore(-amount);

        resetGuessStreak();
      }
      localStorage.setItem(
        "score",
        JSON.stringify({
          score: parseScore.score - amount,
        })
      );

      setQ("category-select-loser");

      if (catNum === "1") {
        localStorage.setItem(
          "game1",
          JSON.stringify({
            ...storedGame1,
            [questionNumber]: "lost",
          })
        );
      }
      if (catNum === "2") {
        localStorage.setItem(
          "game2",
          JSON.stringify({
            ...storedGame2,
            [questionNumber]: "lost",
          })
        );
      }
      if (catNum === "3") {
        localStorage.setItem(
          "game3",
          JSON.stringify({
            ...storedGame3,
            [questionNumber]: "lost",
          })
        );
      }
      updateStrikes(1);
      updateQuestionCount();
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    }
  };

  const showPracticeAnswer = (isCorrect) => {
    if (isCorrect) {
      correctSound();
      if (guessNumber === "1") {
        if (practice) {
          setButton1Style("button-correct-grey");
        } else {
          setButton1Style("button-correct-redviolet");
        }
        updatePracticeGuessStreak();
      } else if (guessNumber === "2") {
        if (practice) {
          setButton2Style("button-correct-grey");
        } else {
          setButton2Style("button-correct-redviolet");
        }
        updatePracticeGuessStreak();
      } else if (guessNumber === "3") {
        if (practice) {
          setButton3Style("button-correct-grey");
        } else {
          setButton3Style("button-correct-redviolet");
        }
        updatePracticeGuessStreak();
      }
      if (practice) {
        setQ("category-select-winner-grey");
      } else {
        setQ("category-select-winner-redviolet");
      }

      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } else if (!isCorrect) {
      wrongSound();
      updatePracticeStrikes(1);
      if (guessNumber === "1") {
        setButton1Style("button-incorrect");
        if (solution === altAnsw2) {
          if (practice) {
            setButton2Style("button-correct-grey");
          } else {
            setButton2Style("button-correct-redviolet");
          }
          //setButton3Style("button-incorrect")
        } else if (solution === altAnsw3) {
          if (practice) {
            setButton3Style("button-correct-grey");
          } else {
            setButton3Style("button-correct-redviolet");
          }
          //setButton2Style("button-incorrect")
        }

        resetPracticeGuessStreak();
      } else if (guessNumber === "2") {
        setButton2Style("button-incorrect");

        if (solution === altAnsw1) {
          if (practice) {
            setButton1Style("button-correct-grey");
          } else {
            setButton1Style("button-correct-redviolet");
          }
          //setButton3Style("button-incorrect")
        } else if (solution === altAnsw3) {
          if (practice) {
            setButton3Style("button-correct-grey");
          } else {
            setButton3Style("button-correct-redviolet");
          }
          //setButton1Style("button-incorrect")
        }
        resetPracticeGuessStreak();
      } else if (guessNumber === "3") {
        setButton3Style("button-incorrect");
        if (solution === altAnsw1) {
          if (practice) {
            setButton1Style("button-correct-grey");
          } else {
            setButton1Style("button-correct-redviolet");
          }
          //setButton2Style("button-incorrect")
        } else if (solution === altAnsw2) {
          if (practice) {
            setButton2Style("button-correct-grey");
          } else {
            setButton2Style("button-correct-redviolet");
          }
          //setButton1Style("button-incorrect")
        }

        resetPracticeGuessStreak();
      }
      setQ("category-select-loser");
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  };

  return (
    <div
      onClick={handleGuess}
      className={`${buttonColor} button-label-container`}
    >
      <div className="button-label">{guess}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    guessStreak: state.guessStreak.streak,
  };
};

export default connect(mapStateToProps, {
  updateGuessStreak,
  updateStrikes,
  updatePracticeStrikes,
  updatePracticeGuessStreak,
  resetGuessStreak,
  resetPracticeGuessStreak,
  updateQuestionCount,
  updatePracticeQuestionCount,
})(TrivGuessButton);
