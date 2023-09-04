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
        case 'SET_SELECTED_ITEM':
            return {
                ...state,
                selectedItem: action.selectedItem,
            }
        case 'SET_SHOW_INFO':
            return {
                ...state,
                showInfo: action.showInfo,
            }
        default:
            return state;
    }
}
export default reducer;