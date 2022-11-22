import {
    USER_TYPE
} from '../actions/types';

export const userType = (state = {userType: 'User'}, action) => {
    switch (action.type) {
        case USER_TYPE: 
            return {...state, userType: action.payload}
        default: 
            return state;
    }
}