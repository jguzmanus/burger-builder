import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
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
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
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

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');

        if (!token) dispatch(logout());
        else if (new Date(expirationDate) <= new Date()) dispatch(logout());
        else {
            dispatch(authSuccess(token));
            dispatch(
                checkAuthTimeout(
                    (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
                )
            );
        }
    };
};
