import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { setUserScore } from "../actions";
import "./TrivQuestion.css";
import TrivGuessButton from "./TrivGuessButton";
import CountdownTimer from "./CountdownTimer";

const TrivQuestion = ({
  amount,
  category,
  catNum,
  questionNumber,
  showModal,
  setShowModal,
  setUserScore,
  setQ,
  practice,
  bookmarkedGame,
}) => {
  const [altAnsw1, setAltAnsw1] = useState(category[`${questionNumber}`].a1);
  const [altAnsw2, setAltAnsw2] = useState(category[`${questionNumber}`].a2);
  const [altAnsw3, setAltAnsw3] = useState(category[`${questionNumber}`].a3);

  const [button1Style, setButton1Style] = useState("button-default");
  const [button2Style, setButton2Style] = useState("button-default");
  const [button3Style, setButton3Style] = useState("button-default");

  const [cancelTimer, setCancelTimer] = useState(false);

  const timerLength = 10000;

  let questionTimer;
  let wrongQuestionPause;

  useEffect(() => {
    questionTimer = setTimeout(() => {
      setShowModal(false);
    }, timerLength);
  }, []);

  const clearTime = () => {
    clearTimeout(questionTimer);
  };

  return (
    <div className="question-modal-container">
      <div className="question-container">
        <div className="prompt-container">
          <p className="prompt-text">{category[`${questionNumber}`].prompt}</p>
        </div>
        <div className="answer-container">
          <div className="guess">
            <TrivGuessButton
              setQ={setQ}
              amount={amount}
              setUserScore={setUserScore}
              setShowModal={setShowModal}
              clearTime={clearTime}
              id={category.id}
              questionNumber={questionNumber}
              guess={category[`${questionNumber}`].a1}
              altAnsw1={altAnsw1}
              altAnsw2={altAnsw2}
              altAnsw3={altAnsw3}
              buttonStyle={button1Style}
              setButton1Style={setButton1Style}
              setButton2Style={setButton2Style}
              setButton3Style={setButton3Style}
              guessNumber="1"
              catNum={catNum}
              setCancelTimer={setCancelTimer}
              practice={practice}
              bookmarkedGame={bookmarkedGame}
            />
          </div>
          <div className="guess">
            <TrivGuessButton
              setQ={setQ}
              amount={amount}
              setUserScore={setUserScore}
              setShowModal={setShowModal}
              clearTime={clearTime}
              id={category.id}
              questionNumber={questionNumber}
              guess={category[`${questionNumber}`].a2}
              altAnsw1={altAnsw1}
              altAnsw2={altAnsw2}
              altAnsw3={altAnsw3}
              buttonStyle={button2Style}
              setButton1Style={setButton1Style}
              setButton2Style={setButton2Style}
              setButton3Style={setButton3Style}
              guessNumber="2"
              catNum={catNum}
              setCancelTimer={setCancelTimer}
              practice={practice}
              bookmarkedGame={bookmarkedGame}
            />
          </div>
          <div className="guess">
            <TrivGuessButton
              setQ={setQ}
              amount={amount}
              setUserScore={setUserScore}
              setShowModal={setShowModal}
              clearTime={clearTime}
              id={category.id}
              questionNumber={questionNumber}
              guess={category[`${questionNumber}`].a3}
              altAnsw1={altAnsw1}
              altAnsw2={altAnsw2}
              altAnsw3={altAnsw3}
              buttonStyle={button3Style}
              setButton1Style={setButton1Style}
              setButton2Style={setButton2Style}
              setButton3Style={setButton3Style}
              guessNumber="3"
              catNum={catNum}
              setCancelTimer={setCancelTimer}
              practice={practice}
              bookmarkedGame={bookmarkedGame}
            />
          </div>
        </div>
      </div>
      {!bookmarkedGame && !practice && (
        <div className="timer-container-green">
          <CountdownTimer
            timerLength={timerLength}
            setShowModal={setShowModal}
            setQ={setQ}
            cancelTimer={cancelTimer}
            practice={practice}
            bookmarkedGame={bookmarkedGame}
          />
        </div>
      )}
      {bookmarkedGame && !practice && (
        <div className="timer-container-redviolet">
          <CountdownTimer
            timerLength={timerLength}
            setShowModal={setShowModal}
            setQ={setQ}
            cancelTimer={cancelTimer}
            practice={practice}
            bookmarkedGame={bookmarkedGame}
          />
        </div>
      )}
      {!bookmarkedGame && practice && (
        <div className="timer-container-grey">
          <CountdownTimer
            timerLength={timerLength}
            setShowModal={setShowModal}
            setQ={setQ}
            cancelTimer={cancelTimer}
            practice={practice}
            bookmarkedGame={bookmarkedGame}
          />
        </div>
      )}
    </div>
  );
};

export default connect(null, { setUserScore })(TrivQuestion);
