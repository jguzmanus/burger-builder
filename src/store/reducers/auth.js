import * as actions from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    let res = state;

    switch (action.actionType) {
        case actions.AUTH_START:
            res = {
                ...state,
                error: null,
                loading: true,
            };
            break;
        case action.AUTH_SUCCESS:
            res = {
                ...state,
                error: null,
                token: action.idToken,
                userId: action.userId,
                loading: false,
            };
            break;
        case action.AUTH_FAIL:
            res = {
                ...state,
                error: action.error,
                loading: false,
            };
            break;
        default:
            res = state;
            break;
    }
    return res;
};

export default reducer;
