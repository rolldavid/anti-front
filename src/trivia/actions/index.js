import { bindActionCreators } from 'redux';
import {
    USER_SCORE,
    RESET_SCORE,
    GUESS,
    STRIKES,
    PRACTICE_STRIKES,
    GUESS_STREAK,
    PRACTICE_GUESS_STREAK,
    RESET_STREAK,
    RESET_PRACTICE_GUESS_STREAK,
    DAILY_GAME_FETCHED,
    RESET_PRACTICE_STRIKES,
    RESET_STRIKES,
    ARCHIVE_ID,
    QUESTIONS_ANSWERED_PRACTICE,
    UPDATE_QUESTIONS_ANSWERED_PRACTICE,
    PRACTICE_PLAYED, 
    QUESTIONS_ANSWERED,
    UPDATE_QUESTIONS_ANSWERED,
    DAILY_GAME_STATUS
} from './types';

export const setUserScore = (score) => {
    return {
        type: USER_SCORE,
        payload: score
    };
};

export const resetScore = (num) => {
    return {
        type: RESET_SCORE,
        payload: num
    };
};

export const addGuess = (guess, truth) => {
    return {
        type: GUESS,
        payload: {
            guess,
            truth
        }
    }
}

export const updateStrikes = (num) => {
    return {
        type: STRIKES,
        payload: num
    }
}

export const resetStrikes = (num) => {
    return {
        type: RESET_STRIKES,
        payload: num
    }
}


export const updatePracticeStrikes = (practiceNum) => {
    return {
        type: PRACTICE_STRIKES,
        payload: practiceNum
    }
}  

export const resetPracticeStrikes = () => {
    return {
        type: RESET_PRACTICE_STRIKES
    }
}

export const updateGuessStreak = () => {
    return {
        type: GUESS_STREAK
    }
}

export const updatePracticeGuessStreak = () => {
    return {
        type: PRACTICE_GUESS_STREAK
    }
}

export const resetGuessStreak = () => {
    return {
        type: RESET_STREAK
    }
}

export const resetPracticeGuessStreak = () => {
    return {
        type: RESET_PRACTICE_GUESS_STREAK
    }
}

export const setDailyGameFetched = (isFetched) => {
    return {
        type: DAILY_GAME_FETCHED,
        payload: isFetched
    }
}

export const setDailyGameStatus = (status) => {
    return {
        type: DAILY_GAME_STATUS,
        payload: status
    }
}

export const setArchiveId = (archiveId, catNum, prompt) => {
    return {
        type: ARCHIVE_ID,
        payload: {archiveId, catNum, prompt}
    }
}

export const updateQuestionCount = () => {
    return {
        type: QUESTIONS_ANSWERED
    }
}

export const resetQuestionCount = (num) => {
    return {
        type: UPDATE_QUESTIONS_ANSWERED,
        payload: num
    }
}

export const updatePracticeQuestionCount = () => {
    return {
        type: QUESTIONS_ANSWERED_PRACTICE
    }
}

export const resetPracticeQuestionCount = () => {
    return {
        type: UPDATE_QUESTIONS_ANSWERED_PRACTICE
    }
}

export const setPracticePlayed = (status) => {
    return {
        type: PRACTICE_PLAYED,
        payload: status
    }
}






