import { 
    USER_SCORE,
    RESET_SCORE,
    GUESS,
    STRIKES,
    PRACTICE_STRIKES,
    GUESS_STREAK,
    RESET_STREAK,
    DAILY_GAME_FETCHED,
    PRACTICE_GUESS_STREAK,
    RESET_PRACTICE_GUESS_STREAK,
    RESET_PRACTICE_STRIKES,
    RESET_STRIKES, 
    ARCHIVE_ID,
    QUESTIONS_ANSWERED,
    UPDATE_QUESTIONS_ANSWERED,
    QUESTIONS_ANSWERED_PRACTICE,
    UPDATE_QUESTIONS_ANSWERED_PRACTICE,
    PRACTICE_PLAYED,
    DAILY_GAME_STATUS
} from "../actions/types";

const GUESSES = {
    cat1Q1: false,
    cat1Q2: false,
    cat1Q3: false,
    cat2Q1: false,
    cat2Q2: false,
    cat2Q3: false,
    cat3Q1: false,
    cat3Q2: false,
    cat3Q3: false
}


export const score = (state = {score: 0}, action) => {
    switch (action.type) {
        case USER_SCORE:
            let updateScore = state.score + action.payload
            return {...state, score: updateScore}
        case RESET_SCORE:
            return {...state, score: action.payload}
        default: 
            return state
    }
}

export const guessStatus = (state = GUESSES, action) => {
    
    switch (action.type) {
        case GUESS:
            let guessKey = action.payload.guess;
            let guessTruth = action.payload.truth;
            return {...state, [`${guessKey}`]: guessTruth}
        default:
            return state
    }
}


export const userStrikes = (state = {strikes: 0, practiceStrikes: 0}, action) => {
    switch (action.type) {
        case STRIKES: 
            let currentStrikes = state.strikes + action .payload;
            return {...state, strikes: currentStrikes}
        case PRACTICE_STRIKES: 
            let currentPracticeStrikes = state.practiceStrikes + action.payload
            return {...state, practiceStrikes: currentPracticeStrikes}
        case RESET_STRIKES: 
        
            return {...state, strikes: action.payload}
        case RESET_PRACTICE_STRIKES: 
            return {...state, practiceStrikes: 0}
        default: 
            return state;
    }
}

export const guessStreak = (state = { streak: 0, practiceStreak: 0 }, action) => {
    switch (action.type) {
        case GUESS_STREAK:
            let currentGuessStreak = state.streak + 1;
            return {...state, streak: currentGuessStreak}
        case RESET_STREAK: 
            return {...state, streak: 0}
        case PRACTICE_GUESS_STREAK:
            let currentPracticeGuessStreak = state.practiceStreak + 1;
            return {...state, practiceStreak: currentPracticeGuessStreak}
        case RESET_PRACTICE_GUESS_STREAK:
            return {...state, practiceStreak: 0}
        default: 
            return state;
    }
}

export const dailyGameStatus = (state = { active: false, fetched: false }, action) => {
    switch (action.type) {
        case DAILY_GAME_STATUS: 
            return {...state, active: action.payload}
        case DAILY_GAME_FETCHED: 
            return {...state, fetched: action.payload}
        default: 
            return state;
    }
}

export const archiveIds = (state = { category1: null, category2: null, category3: null, category1Prompt: [], category2Prompt: [], category3Prompt: []}, action) => {
    switch (action.type) {
        case ARCHIVE_ID:
            if (action.payload.catNum === 1) {
                return {...state, category1: action.payload.archiveId, category1Prompt: action.payload.prompt}
            } else if (action.payload.catNum === 2) {
                return {...state, category2: action.payload.archiveId, category2Prompt: action.payload.prompt}
            } else if (action.payload.catNum === 3) {
                return {...state, category3: action.payload.archiveId, category3Prompt: action.payload.prompt}
            }
            
        default: 
            return state;
    }
}

export const questionsAnswered = (state = {count: 0}, action) => {
    switch (action.type) {
        case UPDATE_QUESTIONS_ANSWERED:
            return {...state, count: action.payload}
        case QUESTIONS_ANSWERED:
            let updateCount = state.count + 1;
            return {...state, count: updateCount}
        default: 
            return state;
    }
}

export const practiceQuestionsAnswered = (state = {count: 0}, action) => {
    switch (action.type) {
        case UPDATE_QUESTIONS_ANSWERED_PRACTICE:
            return {...state, count: 0}
        case QUESTIONS_ANSWERED_PRACTICE:
            let updateCount = state.count + 1;
            return {...state, count: updateCount}
        default: 
            return state;
    }
}

export const practicePlayed = (state = {played: false}, action) => {
    switch (action.type) {
        case PRACTICE_PLAYED:
            return {...state, played: action.payload}
        default: 
            return state; 
    }
}