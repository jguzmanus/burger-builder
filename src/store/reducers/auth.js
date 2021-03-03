import * as actions from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    userId: null,
};

const reducer = (state = initialState, action) => {
    let res = state;

    switch (action.type) {
        case actions.AUTH_START:
            res = {
                ...state,
                error: null,
                loading: true,
            };
            break;
        case actions.AUTH_SUCCESS:
            res = {
                ...state,
                error: null,
                token: action.idToken,
                loading: false,
                userId: action.userId,
            };
            break;
        case actions.AUTH_FAIL:
            res = {
                ...state,
                error: action.error,
                loading: false,
            };
            break;
        case actions.AUTH_LOGOUT:
            res = {
                ...state,
                token: null,
                userId: null,
            };
            break;
        case actions.SET_AUTH_REDIRECT_PATH:
            res = {
                ...state,
                authRedirectPath: action.authRedirectPath,
            };
            break;
        default:
            res = state;
            break;
    }
    return res;
};

export default reducer;
