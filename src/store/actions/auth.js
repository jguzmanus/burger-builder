import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};
export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) =>
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
};
export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        let url = isSignup
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIdkrwkmRU5HpOwFHHiYMehwrARmJAMh4'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIdkrwkmRU5HpOwFHHiYMehwrARmJAMh4';

        axios
            .post(url, authData)
            .then((response) => {
                console.log(response);
                dispatch(checkAuthTimeout(response.data.expiresIn));
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch((err) => {
                console.log(err.response);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        authRedirectPath: path,
    };
};
