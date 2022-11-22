
import {
    USER_TYPE
} from './types';


export const setUserType = (userType) => {
    return {
        type: USER_TYPE,
        payload: userType
    }
}