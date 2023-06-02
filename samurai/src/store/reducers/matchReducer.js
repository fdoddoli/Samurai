const initState = {
    authError: null
};

const matchReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_MATCH_SUCCESS':
            console.log('add match success');
            return state;
        case 'ADD_MATCH_ERROR':
            console.log('add match error');
            return {
                ...state,
                authError: null
            }
        case 'UPDATE_MATCH_SUCCESS':
            console.log('update match success');
            return state;
        case 'UPDATE_MATCH_ERROR':
            console.log('update match error');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default matchReducer;