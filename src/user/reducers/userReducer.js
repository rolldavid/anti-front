

import { 
    USER_TOKEN,
    USER_ID,
    USER_STATUS,
    LOGIN,
    LOGOUT
} from '../actions/types';



export const userToken = (state = '', action) => {
   
    switch (action.type) {
        case USER_TOKEN:
            return {...state, 
                token: action.payload
            }
        default: 
            return state;
    }
};

export const userId = (state = '', action) => {
  
    switch (action.type) {
        case USER_ID:
            return {...state, 
                userId: action.payload
            }
        default: 
            return state;
    }
};

export const userStatus = (state = false, action) => {
   
    switch (action.type) {
        case USER_STATUS:
            return {...state, 
                userStatus: action.payload
            }
        default: 
            return state;
    }
};

export const login = (state = () => {}, action) => {
   
    switch (action.type) {
        case LOGIN:
            return {...state, 
                login: action.payload
            }
        default: 
            return state;
    }
};

export const logout = (state = () => {}, action) => {
   
    switch (action.type) {
        case LOGOUT:
            return {...state, 
                logout: action.payload
            }
        default: 
            return state;
    }
};
