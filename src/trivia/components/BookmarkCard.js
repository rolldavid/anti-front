import { useState } from "react";

import "./BookmarkCard.css";
import remove from "../../img/remove.png";
import removeLight from "../../img/remove-light.png";
import removeGrey from "../../img/remove-grey.png";
import { useHTTP } from "../../shared/hooks/http-hook";
import AddBookmarksButton from "./AddBookmarksButton";

const BookmarkCard = ({ question, answer, questionNum, id, addBookmark }) => {
  const [flipped, setFlipped] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [reload, setReload] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHTTP();

  const storedData = JSON.parse(localStorage.getItem("userData"));

  const handleRemove = () => {
    setConfirmRemove((prev) => !prev);
  };

  const removeBookmark = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/trivia/removebookmark`,
        "POST",
        JSON.stringify({
          gameId: id,
          question: questionNum,
          uid: storedData.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err, "failed to do the http thing...");
    }
    window.location.reload(false);
  };

  return (
    <>
      {!addBookmark && (
        <div
          className="bookmark-card-container"
          onClick={() => setFlipped((prev) => !prev)}
        >
          {!confirmRemove && !flipped && (
            <div className="bookmark-card-question">
              <p className="question-text">{question}</p>
              <img
                src={removeGrey}
                className="remove-img"
                onClick={handleRemove}
                alt="bookmark icon"
              />
            </div>
          )}
          {!confirmRemove && flipped && (
            <div className="bookmark-card-answer">
              <p className="answer-text">{answer}</p>
              <img
                src={removeLight}
                className="remove-img"
                onClick={handleRemove}
                alt="bookmark icon"
              />
            </div>
          )}
          {confirmRemove && (
            <div className="bookmark-card-question">
              <div className="remove-container">
                <p className="confirm-remove">Remove from bookmarks?</p>
                <button className="yes-remove" onClick={removeBookmark}>
                  Remove
                </button>
                <button className="no-cancel" onClick={handleRemove}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {addBookmark && (
        <div className="add-bookmark-card-container">
          <div className="bookmark-card-question">
            <p className="question-text">{question}</p>
            <AddBookmarksButton id={id} question={questionNum} />
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkCard;
