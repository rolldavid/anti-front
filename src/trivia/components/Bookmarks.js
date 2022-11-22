import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Bookmarks.css";
import "../../user/components/auth/Login.css";
import {
  updatePracticeStrikes,
  resetPracticeStrikes,
  resetPracticeQuestionCount,
  setPracticePlayed,
} from "../actions";
import { useHTTP } from "../../shared/hooks/http-hook";
import { handleLoading } from "../../user/utils/is-loading";
import { useBookScroll } from "../hooks/scroll-hook";
import BookmarkedQuery from "./BookmarkedQuery";
import Scroll from "../../img/scroll.png";
import LoginForm from "../../user/components/auth/LoginForm";
import CategoryContainer from "./CategoryContainer";
import ResultModal from "../utils/ResultModal";
import Strikes from "./Strikes";

let sortFlag = false;
let gameFlag = false;

const scramble = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Bookmarks = ({
  logout,
  userId,
  userStatus,
  strikes,
  guessStreak,
  practiceQuestionsAnswered,
  updatePracticeStrikes,
  resetPracticeStrikes,
  resetPracticeQuestionCount,
}) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHTTP();
  const [profileName, setProfileName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search...");
  const [hasBookmarks, setHasBookmarks] = useState(true);
  const [startBookmarkedGame, setStartBookmarkedGame] = useState(false);
  const [bookmarkedList, setBookmarkedList] = useState([]);
  const [bookmarkedFilteredList, setBookmarkedFilteredList] = useState([]);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const [bookmarkedGameCat1, setBookmarkedGameCat1] = useState({});
  const [bookmarkedGameCat2, setBookmarkedGameCat2] = useState({});
  const [bookmarkedGameCat3, setBookmarkedGameCat3] = useState({});

  const refList = useRef([]);

  const scrollPosition = useBookScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    resetPracticeQuestionCount();
    resetPracticeStrikes();
  }, [startBookmarkedGame]);

  useEffect(() => {
    let count = 9 - bookmarkedList.length;
    setBookmarkCount(count);
    if (bookmarkedList) {
      gameFlag = true;
    }
  }, [bookmarkedList]);

  useEffect(() => {
    if (guessStreak === 3 && strikes > 0) {
      updatePracticeStrikes(-1);
    }
  }, [guessStreak]);

  useEffect(() => {
    if (strikes === 3 && startBookmarkedGame) {
      setShowResultModal(true);
      setStartBookmarkedGame(false);
      setTimeout(() => {
        setShowResultModal(false);
      }, 2000);
    }
  }, [strikes]);

  useEffect(() => {
    if (practiceQuestionsAnswered >= 9 && startBookmarkedGame) {
      setShowResultModal(true);
      setStartBookmarkedGame(false);
      setTimeout(() => {
        setShowResultModal(false);
      }, 2000);
    }
  }, [practiceQuestionsAnswered]);

  useEffect(() => {
    refList.current = refList.current.slice(0, categories.length);
  }, [categories]);

  useEffect(() => {
    if (scrollPosition > 500) {
      setHasScrolled(true);
    }
  }, [scrollPosition]);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (search) => {
    refList.current[sortIndex].style.backgroundColor = "#ffffff";
    refList.current[sortIndex].style.color = "#3f4147";
    setFilterType("search");
    setSearchTerm(search);
    setIsFiltered(search);
  };

  const handleSort = (sort, index) => {
    setSortIndex(index);
    setSearchPlaceholder("Search...");
    if (!isFiltered && !sortFlag) {
      setFilterType("sort");
      setSearchTerm(sort);
      setIsFiltered(sort);
      refList.current[index].style.backgroundColor = "#3f4147";
      refList.current[index].style.color = "#ffffff";
      sortFlag = true;
    } else if (sortFlag && index === sortIndex) {
      refList.current[index].style.backgroundColor = "#ffffff";
      refList.current[index].style.color = "#3f4147";
      sortFlag = false;
      setIsFiltered(false);
    } else {
      refList.current[sortIndex].style.backgroundColor = "#ffffff";
      refList.current[sortIndex].style.color = "#3f4147";
      refList.current[index].style.backgroundColor = "#3f4147";
      refList.current[index].style.color = "#ffffff";
      setFilterType("sort");
      setSearchTerm(sort);
      setIsFiltered(sort);
    }
  };

  const handleBookmarkedGame = async () => {
    const categories = scramble(bookmarkedList);
    console.log(categories);

    const scrambleCat1Q1 = scramble([
      categories[0].question.solution,
      categories[0].question.fake,
      categories[0].question.deepfake,
    ]);
    const scrambleCat1Q2 = scramble([
      categories[1].question.solution,
      categories[1].question.fake,
      categories[1].question.deepfake,
    ]);
    const scrambleCat1Q3 = scramble([
      categories[2].question.solution,
      categories[2].question.fake,
      categories[2].question.deepfake,
    ]);

    const scrambleCat2Q1 = scramble([
      categories[3].question.solution,
      categories[3].question.fake,
      categories[3].question.deepfake,
    ]);
    const scrambleCat2Q2 = scramble([
      categories[4].question.solution,
      categories[4].question.fake,
      categories[4].question.deepfake,
    ]);
    const scrambleCat2Q3 = scramble([
      categories[5].question.solution,
      categories[5].question.fake,
      categories[5].question.deepfake,
    ]);

    const scrambleCat3Q1 = scramble([
      categories[6].question.solution,
      categories[6].question.fake,
      categories[6].question.deepfake,
    ]);
    const scrambleCat3Q2 = scramble([
      categories[7].question.solution,
      categories[7].question.fake,
      categories[7].question.deepfake,
    ]);
    const scrambleCat3Q3 = scramble([
      categories[8].question.solution,
      categories[8].question.fake,
      categories[8].question.deepfake,
    ]);

    setBookmarkedGameCat1({
      category: "Not-Pourri",
      author: "Antitrivia",
      q1: {
        prompt: categories[0].question.prompt,
        id: categories[0].gameNum,
        sol: categories[0].question.solution,
        a1: scrambleCat1Q1[0],
        a2: scrambleCat1Q1[1],
        a3: scrambleCat1Q1[2],
      },
      q2: {
        prompt: categories[1].question.prompt,
        id: categories[1].gameNum,
        sol: categories[1].question.solution,
        a1: scrambleCat1Q2[0],
        a2: scrambleCat1Q2[1],
        a3: scrambleCat1Q2[2],
      },
      q3: {
        prompt: categories[2].question.prompt,
        id: categories[2].gameNum,
        sol: categories[2].question.solution,
        a1: scrambleCat1Q3[0],
        a2: scrambleCat1Q3[1],
        a3: scrambleCat1Q3[2],
      },
    });
    setBookmarkedGameCat2({
      category: "Mixed Bag",
      author: "Antitrivia",
      q1: {
        prompt: categories[3].question.prompt,
        id: categories[3].gameNum,
        sol: categories[3].question.solution,
        a1: scrambleCat2Q1[0],
        a2: scrambleCat2Q1[1],
        a3: scrambleCat2Q1[2],
      },
      q2: {
        prompt: categories[4].question.prompt,
        id: categories[4].gameNum,
        sol: categories[4].question.solution,
        a1: scrambleCat2Q2[0],
        a2: scrambleCat2Q2[1],
        a3: scrambleCat2Q2[2],
      },
      q3: {
        prompt: categories[5].question.prompt,
        id: categories[5].gameNum,
        sol: categories[5].question.solution,
        a1: scrambleCat2Q3[0],
        a2: scrambleCat2Q3[1],
        a3: scrambleCat2Q3[2],
      },
    });
    setBookmarkedGameCat3({
      category: "Bookmarks Schmookmarks",
      author: "Antitrivia",
      q1: {
        prompt: categories[6].question.prompt,
        id: categories[6].gameNum,
        sol: categories[6].question.solution,
        a1: scrambleCat3Q1[0],
        a2: scrambleCat3Q1[1],
        a3: scrambleCat3Q1[2],
      },
      q2: {
        prompt: categories[7].question.prompt,
        id: categories[7].gameNum,
        sol: categories[7].question.solution,
        a1: scrambleCat3Q2[0],
        a2: scrambleCat3Q2[1],
        a3: scrambleCat3Q2[2],
      },
      q3: {
        prompt: categories[8].question.prompt,
        id: categories[8].gameNum,
        sol: categories[8].question.solution,
        a1: scrambleCat3Q3[0],
        a2: scrambleCat3Q3[1],
        a3: scrambleCat3Q3[2],
      },
    });

    setStartBookmarkedGame(true);
  };

  const handleBookmarkedGameExit = () => {
    setIsFiltered(false);
    setStartBookmarkedGame(false);
  };

  return (
    <>
      <div className="bookmarks-header">Bookmarks</div>
      {isLoading && (
        <div className="bookmarks-container">
          <div className="bookmarks-inner-container">{handleLoading()}</div>
        </div>
      )}
      {!hasBookmarks && !isLoading && !startBookmarkedGame && (
        <div className="bookmarks-container">
          <div>Complete a daily or practice game to add bookmarks.</div>
        </div>
      )}
      {userStatus && startBookmarkedGame && (
        <div className="bookmarks-container-play">
          <div className="strikes-container">
            <Strikes practice />
          </div>
        </div>
      )}
      {hasBookmarks && !isLoading && userStatus && !startBookmarkedGame && (
        <div className="bookmarks-container">
          <div className="bookmarks-inner-container">
            <Formik
              initialValues={{ searchTerm: "" }}
              validationSchema={Yup.object({
                searchTerm: Yup.string().min(
                  3,
                  "Must be at least 3 characters"
                ),
              })}
              validateOnChange={false}
              onSubmit={(values, { resetForm }) => {
                handleSearch(values.searchTerm);
                resetForm({ searchTerm: "" });
              }}
            >
              <Form className="search-bookmarks-container">
                <div className="login-input-container">
                  <Field
                    className="search-bookmarks"
                    name="searchTerm"
                    type="text"
                    placeholder={searchPlaceholder}
                  />
                  <ErrorMessage className="input-label" name="searchTerm">
                    {(msg) => <div className="input-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <button className="search-button" type="submit" />
              </Form>
            </Formik>

            <div className="bookmarked-categories">
              {categories.map((category, index) => (
                <div key={index}>
                  <button
                    className="bookmark-category-button"
                    ref={(el) => (refList.current[index] = el)}
                    onClick={() => handleSort(category, index)}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
            {!isFiltered && (
              <BookmarkedQuery
                isFiltered={isFiltered}
                setCategories={setCategories}
                setHasBookmarks={setHasBookmarks}
                bookmarkedList={bookmarkedList}
                setBookmarkedList={setBookmarkedList}
              />
            )}
            {isFiltered && (
              <BookmarkedQuery
                isFiltered={isFiltered}
                searchTerm={searchTerm}
                filterType={filterType}
                setHasBookmarks={setHasBookmarks}
                bookmarkedList={bookmarkedList}
                bookmarkedFilteredList={bookmarkedFilteredList}
                setBookmarkedFilteredList={setBookmarkedFilteredList}
              />
            )}
          </div>
        </div>
      )}

      {gameFlag && !startBookmarkedGame && bookmarkedList.length > 1 && (
        <div className="play-bookmarks-container">
          <p className="play-game-count">
            Bookmark {bookmarkCount} more questions to play bookmarks
          </p>
        </div>
      )}

      {gameFlag && !startBookmarkedGame && bookmarkCount === 1 && (
        <div className="play-bookmarks-container">
          <p className="play-game-count">
            Bookmark {bookmarkCount} more question to play bookmarks
          </p>
        </div>
      )}

      {!startBookmarkedGame && bookmarkedList.length >= 9 && (
        <div className="play-bookmarks-container">
          <p className="play-game" onClick={handleBookmarkedGame}>
            Create Game from Bookmarks
          </p>
        </div>
      )}

      {startBookmarkedGame && (
        <div className="play-bookmarks-container">
          <p className="play-game" onClick={handleBookmarkedGameExit}>
            Go back to bookmarks
          </p>
        </div>
      )}

      {!isLoading && !userStatus && !startBookmarkedGame && (
        <div className="bookmarks-container-join">
          <LoginForm />
        </div>
      )}

      {hasScrolled && !startBookmarkedGame && (
        <div className="scroll-icon-container">
          <img
            src={Scroll}
            alt="scroll up"
            className="scroll-icon"
            onClick={handleScrollUp}
          />
        </div>
      )}

      {startBookmarkedGame && (
        <CategoryContainer
          practice={false}
          bookmarkedGame={true}
          bookmarkedGameCat1={bookmarkedGameCat1}
          bookmarkedGameCat2={bookmarkedGameCat2}
          bookmarkedGameCat3={bookmarkedGameCat3}
        />
      )}

      <ResultModal
        setShowResultModal={setShowResultModal}
        showResultModal={showResultModal}
        practice={true}
        result={strikes >= 3 ? true : false}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    logout: state.logout.logout,
    userId: state.userId.userId,
    userStatus: state.userStatus.userStatus,
    strikes: state.userStrikes.practiceStrikes,
    guessStreak: state.guessStreak.practiceStreak,
    practiceQuestionsAnswered: state.practiceQuestionsAnswered.count,
  };
};

export default connect(mapStateToProps, {
  updatePracticeStrikes,
  resetPracticeStrikes,
  resetPracticeQuestionCount,
})(Bookmarks);
