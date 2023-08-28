const reducer = (state, action) => {
    console.log(action)
    
    switch (action.type) {
        case 'SET_CART_SHOW':
            return {
                ...state,
                cartShow: action.cartShow,
            };
    
        default:
          return state;  
    }

}

export default reducer;