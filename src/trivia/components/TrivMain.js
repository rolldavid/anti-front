import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import Strikes from "./Strikes";
import CategoryContainer from "./CategoryContainer";
import {
  updateStrikes,
  resetStrikes,
  resetScore,
  updateQuestionCount,
  resetQuestionCount,
  setDailyGameStatus,
} from "../actions";
import GameOver from "./GameOver";
import ResultModal from "../utils/ResultModal";
import { useHTTP } from "../../shared/hooks/http-hook";
import "./TrivMain.css";
import { userStatus } from "../../user/reducers/userReducer";

const TrivMain = ({
  score,
  strikes,
  guessStreak,
  updateStrikes,
  setDailyGameStatus,
  dailyGameStatus,
  resetStrikes,
  resetScore,
  updateQuestionCount,
  resetQuestionCount,
  questionsAnswered,
  gameStatus,
  userStatus,
}) => {
  const [scoreStyle, setScoreStyle] = useState("score-container-positive");
  const [showResultModal, setShowResultModal] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [gameLoading, setGameLoading] = useState(true);

  const parseStrikes = JSON.parse(localStorage.getItem("strikes"));
  const parseScore = JSON.parse(localStorage.getItem("score"));
  const gameComplete = JSON.parse(localStorage.getItem("gameComplete"));
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { isLoading, error, sendRequest, clearError } = useHTTP();

  useEffect(() => {
    if (parseStrikes) {
      resetStrikes(parseStrikes.strikes);
    }
    if (parseScore) {
      resetScore(parseScore.score);
    }
    if (gameComplete) {
      resetQuestionCount(gameComplete.questionsAnswered);
      setDailyGameStatus(gameComplete.complete);
    }
  }, []);

  useEffect(() => {
    if (guessStreak === 3 && strikes > 0) {
      updateStrikes(-1);
    }
  }, [guessStreak]);

  useEffect(() => {
    localStorage.setItem(
      "strikes",
      JSON.stringify({
        strikes: strikes,
      })
    );
    if (strikes === 3 && !gameStatus) {
      setDailyGameStatus(true);
      localStorage.setItem(
        "gameComplete",
        JSON.stringify({
          ...gameComplete,
          complete: true,
        })
      );
      setDailyGameStatus(true);
      setShowResultModal(true);
      setTimeout(() => {
        setShowResultModal(false);
      }, 2000);
    }
  }, [strikes]);

  useEffect(() => {
    if (gameStatus)
      localStorage.setItem(
        "gameComplete",
        JSON.stringify({
          ...gameComplete,
          complete: true,
        })
      );
  }, [gameStatus]);

  useEffect(() => {
    localStorage.setItem(
      "gameComplete",
      JSON.stringify({
        ...gameComplete,
        questionsAnswered: questionsAnswered,
      })
    );
    if (questionsAnswered === 9 && !gameStatus) {
      setDailyGameStatus(true);
      localStorage.setItem(
        "gameComplete",
        JSON.stringify({
          ...gameComplete,
          complete: true,
        })
      );
      setShowResultModal(true);
      setTimeout(() => {
        setShowResultModal(false);
      }, 2000);
    }
  }, [questionsAnswered]);

  useEffect(() => {
    if (score >= 0) {
      setScoreStyle("score-container-positive");
    } else {
      setScoreStyle("score-container-positive");
    }
  }, [score]);

  return (
    <>
      <div className="daily-header">Daily Game</div>
      <div className="triv-main">
        {!gameStatus && !gameLoading && (
          <div className="strikes-container">
            <Strikes practice={false} />
          </div>
        )}

        {
          <div className="triv-container">
            <CategoryContainer
              practice={false}
              bookmarkedGame={false}
              newGame={newGame}
              setNewGame={setNewGame}
              setGameLoading={setGameLoading}
            />
          </div>
        }

        {!gameStatus && !gameLoading && (
          <div className={scoreStyle}>
            <div>
              <p>Score: {score}</p>
            </div>
          </div>
        )}

        <ResultModal
          points={score}
          setShowResultModal={setShowResultModal}
          showResultModal={showResultModal}
          practice={false}
          bookmarkedGame={false}
          result={strikes >= 3 ? true : false}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    score: state.score.score,
    strikes: state.userStrikes.strikes,
    guessStreak: state.guessStreak.streak,
    questionsAnswered: state.questionsAnswered.count,
    gameStatus: state.dailyGameStatus.active,
    userStatus: state.userStatus.userStatus,
  };
};

export default connect(mapStateToProps, {
  updateStrikes,
  resetStrikes,
  resetScore,
  updateQuestionCount,
  resetQuestionCount,
  setDailyGameStatus,
})(TrivMain);
