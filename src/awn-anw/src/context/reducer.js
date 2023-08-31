const reducer = (state, action) => {
    console.log(action)
    
    switch (action.type) {
        case 'SET_CART_SHOW':
            return {
                ...state,
                cartShow: action.cartShow,
            };
        case 'SET_ADD_FOOD_SHOW':
            return {
                ...state,
                addFoodShow: action.addFoodShow,
            };
        case 'SET_SELECTED_FOOD':
            return {
                ...state,
                selectedFood: action.selectedFood,
            };
        default:
          return state;  
    }

}

export default reducer;