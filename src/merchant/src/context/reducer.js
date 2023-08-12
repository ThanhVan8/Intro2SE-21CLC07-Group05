const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        default:
            return state;
    }
}
export default reducer;