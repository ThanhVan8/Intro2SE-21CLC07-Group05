const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'SET_SHOW_ADD_CATEGORY':
            return {
                ...state,
                showAddCategory: action.showAddCategory,
            }
        default:
            return state;
    }
}
export default reducer;