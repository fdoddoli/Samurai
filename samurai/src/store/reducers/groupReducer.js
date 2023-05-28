const initState = {
    authError: null
};

const groupReducer = (state = initState, action) => {
    switch(action.type) {
        case 'JOIN_GROUP_SUCCESS':
            console.log('joined group success');
            return state;
        case 'JOIN_GROUP_ERROR':
            console.log('joined group error');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default groupReducer;