import {
    USER_TOKEN,
    USER_ID,
    USER_STATUS,
    LOGIN,
    LOGOUT
} from './types';

export const setToken = (token) => {
    return {
        type: USER_TOKEN,
        payload: token
    };
};

export const setUserId = (uid) => {
    return {
        type: USER_ID,
        payload: uid
    };
};

export const setStatus = (status) => {
    return {
        type: USER_STATUS,
        payload: status
    };
};

export const callLogin = (loginFunc) => {
    return {
        type: LOGIN,
        payload: loginFunc
    };
};

export const callLogout = (logoutFunc) => {
    return {
        type: LOGOUT,
        payload: logoutFunc
    };
};


