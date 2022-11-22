import { useState, useEffect } from "react";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";
import { Link, Navigate } from "react-router-dom";

import "./AddBookmarks.css";
import { useHTTP } from "../../shared/hooks/http-hook";
import AddBookmarksButton from "./AddBookmarksButton";
import { archiveIds } from "../reducers/trivReducer";
import { handleLoading } from "../../user/utils/is-loading";
import LoginForm from "../../user/components/auth/LoginForm";
import {
  setPracticePlayed,
  resetPracticeStrikes,
  resetPracticeQuestionCount,
} from "../actions";
import BookmarkCard from "./BookmarkCard";

const AddBookmarks = ({
  setShowBookmarksModal,
  practice,
  category1,
  category2,
  category3,
  category1Prompt,
  category2Prompt,
  category3Prompt,
  userStatus,
  strikes,
  practiceStrikes,
  setPracticePlayed,
  resetPracticeQuestionCount,
  resetPracticeStrikes,
}) => {
  const { isLoading, error, sendRequest, clearError } = useHTTP();
  const [isBookmarked, setIsBookamrked] = useState(false);
  const [reload, setReload] = useState(false);

  const [cat1, setCat1] = useState([]);
  const [cat2, setCat2] = useState([]);
  const [cat3, setCat3] = useState([]);
  const [cat1Id, setCat1Id] = useState("");
  const [cat2Id, setCat2Id] = useState("");
  const [cat3Id, setCat3Id] = useState("");

  useEffect(() => {
    if (!practice) {
      const getCategories = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/trivia/secretgame`
          );
          const bytes = CryptoJS.AES.decrypt(responseData.cat1, "antitriv");
          const decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          const bytes2 = CryptoJS.AES.decrypt(responseData.cat2, "antitriv");
          const decryptedData2 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));
          const bytes3 = CryptoJS.AES.decrypt(responseData.cat3, "antitriv");
          const decryptedData3 = JSON.parse(bytes3.toString(CryptoJS.enc.Utf8));

          setCat1([
            decryptedData1.q1.prompt,
            decryptedData1.q2.prompt,
            decryptedData1.q3.prompt,
          ]);
          setCat2([
            decryptedData2.q1.prompt,
            decryptedData2.q2.prompt,
            decryptedData2.q3.prompt,
          ]);
          setCat3([
            decryptedData3.q1.prompt,
            decryptedData3.q2.prompt,
            decryptedData3.q3.prompt,
          ]);
          setCat1Id(decryptedData1.id);
          setCat2Id(decryptedData2.id);
          setCat3Id(decryptedData3.id);
        } catch (err) {
          console.log(err, "failed to do the http thing...");
        }
      };
      getCategories();
    }
    if (practice) {
      setCat1(category1Prompt);
      setCat2(category2Prompt);
      setCat3(category3Prompt);
      setCat1Id(category1);
      setCat2Id(category2);
      setCat3Id(category3);
    }
  }, [
    category1,
    category1Prompt,
    category2,
    category2Prompt,
    category3,
    ,
    category3Prompt,
  ]);

  const handleAdd = () => {
    setIsBookamrked((current) => !current);
  };

  const handlePlayAgain = () => {
    resetPracticeQuestionCount();
    resetPracticeStrikes();
    setPracticePlayed(false);
  };

  const randomKey = Math.floor(Math.random() * 10000);

  return (
    <>
      <div className="add-bookmarks-container">
        <div className="add-bookmarks-inner-container">
          {isLoading && <div>{handleLoading()}</div>}
          {!practice && !isLoading && strikes < 3 && (
            <div className="you-won">{`You won. New daily game midnight EST.`}</div>
          )}
          {!practice && !isLoading && strikes >= 3 && (
            <div className="you-lost">{`You lost. New daily game midnight EST.`}</div>
          )}

          {!userStatus && !isLoading && (
            <div className="add-bookmark-question-container-out">
              <div className="add-bookmarks-login">
                <p className="join-title">Join our community</p>
                <div className="benefits-list">
                  <ul>
                    <li className="benefits-item">
                      Add & track points from daily games
                    </li>
                    <li className="benefits-item">
                      Bookmark questions to review & play
                    </li>
                    <li className="benefits-item">
                      Play practice games from the archive
                    </li>

                    <li className="benefits-item">
                      Share bookmarked questions with friends
                    </li>
                    <li className="benefits-item">
                      Get news & updates from our contributors
                    </li>
                  </ul>
                </div>
                <div className="bookmarks-auth">
                  <Link to="/login">
                    <button className="bookmarks-join-button">Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className="bookmarks-signup-button">Signup</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="add-bookmarks-container">
        {userStatus && !practice && !isLoading && (
          <h2 className="add-bookmarks-title">Bookmark today's questions.</h2>
        )}
        {userStatus && practice && !isLoading && (
          <div>
            <p className="new-practice-game" onClick={handlePlayAgain}>
              Play Again
            </p>
          </div>
        )}
        {userStatus && practice && !isLoading && (
          <h2 className="add-bookmarks-title">
            Bookmark questions from this game.
          </h2>
        )}

        {userStatus && !isLoading && (
          <div className="add-bookmarks-inner-container">
            <div className="bookmarked-detail-container">
              {cat1.map((question, index) => (
                <BookmarkCard
                  question={question}
                  questionNum={index}
                  id={cat1Id}
                  key={index}
                  addBookmark={true}
                />
              ))}

              {cat2.map((question, index) => (
                <BookmarkCard
                  question={question}
                  questionNum={index}
                  id={cat2Id}
                  key={index}
                  addBookmark={true}
                />
              ))}

              {cat3.map((question, index) => (
                <BookmarkCard
                  question={question}
                  questionNum={index}
                  id={cat3Id}
                  key={index}
                  addBookmark={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    category1: state.archiveIds.category1,
    category2: state.archiveIds.category2,
    category3: state.archiveIds.category3,
    category1Prompt: state.archiveIds.category1Prompt,
    category2Prompt: state.archiveIds.category2Prompt,
    category3Prompt: state.archiveIds.category3Prompt,
    userStatus: state.userStatus.userStatus,
    strikes: state.userStrikes.strikes,
    practiceStrikes: state.userStrikes.practiceStrikes,
  };
};
export default connect(mapStateToProps, {
  setPracticePlayed,
  resetPracticeQuestionCount,
  resetPracticeStrikes,
})(AddBookmarks);
