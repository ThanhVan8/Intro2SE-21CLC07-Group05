const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'SET_SHOW_ADD_ITEM':
            return {
                ...state,
                showAddItem: action.showAddItem,
            }
        case 'SET_SHOW_UPDATE_ITEM':
            return {
                ...state,
                showUpdateItem: action.showUpdateItem,
            }
        case 'SET_SHOW_DELETE_ITEM':
            return {
                ...state,
                showDeleteItem: action.showDeleteItem,
            }
        default:
            return state;
    }
}
export default reducer;