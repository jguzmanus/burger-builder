import * as actions from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    totalPrice: 4,
    ingredients: null,
    error: false,
    building: false,
};

const reducer = (state = initialState, action) => {
    const updatedIngredients = { ...state.ingredients };
    let res = state;
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            updatedIngredients[action.ingredientType] =
                state.ingredients[action.ingredientType] + 1;
            res = {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
                building: true,
            };
            break;
        case actions.REMOVE_INGREDIENT:
            updatedIngredients[action.ingredientType] =
                state.ingredients[action.ingredientType] - 1 > 0
                    ? state.ingredients[action.ingredientType] - 1
                    : 0;

            res = {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
                building: true,
            };
            break;
        case actions.SET_INGREDIENTS:
            res = {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
                building: false,
            };
            break;
        case actions.FETCH_INGREDIENTS_FAILED:
            res = {
                ...state,
                error: true,
            };
            break;
        default:
            res = state;
    }

    return res;
};

export default reducer;
