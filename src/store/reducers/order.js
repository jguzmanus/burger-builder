import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    let res = state;
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            res = {
                ...state,
                purchased: false,
            };
            break;
        case actionTypes.PURCHASE_BURGER_START:
            res = {
                ...state,
                loading: true,
            };
            break;
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            res = {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            };
            break;
        case actionTypes.PURCHASE_BURGER_FAIL:
            res = {
                ...state,
                loading: false,
            };
            break;
        case actionTypes.FETCH_ORDERS_START:
            res = {
                ...state,
                loading: true,
            };
            break;
        case actionTypes.FETCH_ORDERS_SUCCESS:
            res = {
                ...state,
                orders: action.orders,
                loading: false,
            };
            break;
        case actionTypes.FETCH_ORDERS_FAIL:
            res = {
                ...state,
                loading: false,
            };
            break;
        default:
            res = state;
    }
    // console.log('[orderReducer]', res);
    return res;
};

export default reducer;
