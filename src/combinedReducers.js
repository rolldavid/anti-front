import { combineReducers } from "redux";

import { 
    score, 
    guessStatus, 
    userStrikes, 
    guessStreak, 
    dailyGameStatus, 
    archiveIds, 
    questionsAnswered, 
    practiceQuestionsAnswered,
    practicePlayed
} from "./trivia/reducers/trivReducer";

import { userToken, userId, userStatus, login, logout } from "./user/reducers/userReducer";
import { userType } from "./admin/reducers/adminReducers";


export default combineReducers({
    score: score,
    token: userToken,
    userId: userId,
    userStatus: userStatus,
    login: login,
    logout: logout,
    userType: userType,
    guessStatus: guessStatus,
    userStrikes: userStrikes,
    guessStreak: guessStreak,
    dailyGameStatus: dailyGameStatus,
    archiveIds: archiveIds,
    questionsAnswered: questionsAnswered,
    practiceQuestionsAnswered: practiceQuestionsAnswered,
    practicePlayed: practicePlayed
});

