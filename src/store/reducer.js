import * as actions from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    totalPrice: 4,
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0,
    },
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
                totalPrice:
                    state.totalPrice +
                    INGREDIENT_PRICES[action.ingredientType],
            };
            break;
        case actions.REMOVE_INGREDIENT:
            updatedIngredients[action.ingredientType] =
                state.ingredients[action.ingredientType] - 1 >
                0
                    ? state.ingredients[
                          action.ingredientType
                      ] - 1
                    : 0;

            res = {
                ...state,
                ingredients: updatedIngredients,
                totalPrice:
                    state.totalPrice -
                    INGREDIENT_PRICES[action.ingredientType],
            };
            break;
    }
    console.log('[reducer]', res);
    return res;
};

export default reducer;
