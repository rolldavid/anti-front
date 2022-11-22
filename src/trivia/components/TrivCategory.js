import { useState, useEffect } from "react";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";

import "./TrivCategory.css";
import "./CategoryContainer.css";
import QuestionModal from "../utils/Modal";
import { addGuess } from "../actions";
import { guessStatus } from "../reducers/trivReducer";
import info from "../../img/info.png";
import InfoModal from "../utils/InfoModal";
import { useHTTP } from "../../shared/hooks/http-hook";

const TrivCategory = ({
  category,
  catNum,
  practice,
  bookmarkedGame,
  keyNum,
  setScore,
  addGuess,
  setQ1,
  setQ2,
  setQ3,
  q1Style,
  q2Style,
  q3Style,
  guessStatus,
  showInfo,
  setShowInfo,
  setShowInfo2,
  setShowInfo3,
  userStatus,
}) => {
  const { isLoading, error, sendRequest, clearError } = useHTTP();
  const [gameId, setGameId] = useState(category.id);

  const [q1Value, setQ1Value] = useState(200);
  const [q2Value, setQ2Value] = useState(400);
  const [q3Value, setQ3Value] = useState(600);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("userData"));

  const handleQ1Click = async () => {
    if (q1Style === "category-select-container-default") {
      setShowModal1(true);
      if (bookmarkedGame) {
        let encodedSol = CryptoJS.AES.encrypt(
          JSON.stringify(category.q1.sol),
          "antitriv"
        ).toString();
        localStorage.setItem("enc", JSON.stringify({ sol: encodedSol }));
      } else {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/trivia/sol`,
            "POST",
            JSON.stringify({
              id: category.id,
              question: "q1",
            }),
            {
              "Content-Type": "application/json",
            }
          );

          localStorage.setItem(
            "enc",
            JSON.stringify({ sol: responseData.enc })
          );
        } catch (err) {
          console.log(err, "failed to do the http thing...");
        }
      }
    }
  };

  const handleQ2Click = async () => {
    if (q2Style === "category-select-container-default") {
      setShowModal2(true);
      if (bookmarkedGame) {
        console.log(category);
        let encodedSol = CryptoJS.AES.encrypt(
          JSON.stringify(category.q2.sol),
          "antitriv"
        ).toString();
        localStorage.setItem("enc", JSON.stringify({ sol: encodedSol }));
      } else {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/trivia/sol`,
            "POST",
            JSON.stringify({
              id: category.id,
              question: "q2",
            }),
            {
              "Content-Type": "application/json",
            }
          );
          localStorage.setItem(
            "enc",
            JSON.stringify({ sol: responseData.enc })
          );
        } catch (err) {
          console.log(err, "failed to do the http thing...");
        }
      }
    }
  };

  const handleQ3Click = async () => {
    if (q3Style === "category-select-container-default") {
      setShowModal3(true);
      if (bookmarkedGame) {
        let encodedSol = CryptoJS.AES.encrypt(
          JSON.stringify(category.q3.sol),
          "antitriv"
        ).toString();
        localStorage.setItem("enc", JSON.stringify({ sol: encodedSol }));
      } else {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/trivia/sol`,
            "POST",
            JSON.stringify({
              id: category.id,
              question: "q3",
            }),
            {
              "Content-Type": "application/json",
            }
          );

          localStorage.setItem(
            "enc",
            JSON.stringify({ sol: responseData.enc })
          );
        } catch (err) {
          console.log(err, "failed to do the http thing...");
        }
      }
    }
  };

  return (
    <>
      <QuestionModal
        amount={q1Value}
        category={category}
        catNum={catNum}
        questionNumber="q1"
        setShowModal={setShowModal1}
        showModal={showModal1}
        setScore={setScore}
        setQ={setQ1}
        keyNum={keyNum}
        practice={practice}
        bookmarkedGame={bookmarkedGame}
      />
      <QuestionModal
        amount={q2Value}
        category={category}
        catNum={catNum}
        questionNumber="q2"
        setShowModal={setShowModal2}
        showModal={showModal2}
        setScore={setScore}
        setQ={setQ2}
        practice={practice}
        bookmarkedGame={bookmarkedGame}
      />
      <QuestionModal
        amount={q3Value}
        category={category}
        catNum={catNum}
        questionNumber="q3"
        setShowModal={setShowModal3}
        showModal={showModal3}
        setScore={setScore}
        setQ={setQ3}
        practice={practice}
        bookmarkedGame={bookmarkedGame}
      />

      <div className="category-detail-container">
        <div className="category-name-container">{category.category}</div>
        <div className={q1Style} onClick={handleQ1Click}>
          {q1Style !== "category-select-loser" &&
            q1Style !== "category-select-winner" &&
            q1Value}
          {q1Style === "category-select-loser" && <div className="wrong"></div>}
          {q1Style === "category-select-winner" && (
            <div className="wrong"></div>
          )}
        </div>
        <div className={q2Style} onClick={handleQ2Click}>
          {q2Style !== "category-select-loser" &&
            q2Style !== "category-select-winner" &&
            q2Value}
          {q2Style === "category-select-loser" && <div className="wrong"></div>}
          {q2Style === "category-select-loser" && <div className="wrong"></div>}
        </div>
        <div className={q3Style} onClick={handleQ3Click}>
          {q3Style !== "category-select-loser" &&
            q3Style !== "category-select-winner" &&
            q3Value}
          {q3Style === "category-select-loser" && <div className="wrong"></div>}
          {q3Style === "category-select-winner" && (
            <div className="wrong"></div>
          )}
        </div>
        {!bookmarkedGame && (
          <div className="author-category">
            <div className="author-detail">
              <img
                onClick={() => {
                  setShowInfo2(false);
                  setShowInfo3(false);
                  setShowInfo(!showInfo);
                }}
                className="info-img"
                src={info}
                alt="author detail"
              />
            </div>
          </div>
        )}
        <InfoModal
          setShowInfo={setShowInfo}
          showInfo={showInfo}
          category={category}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    guessStatus: state.guessStatus,
    userStatus: state.userStatus.userStatus,
  };
};

export default connect(mapStateToProps, { addGuess })(TrivCategory);
