const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'JOIN_GROUP_SUCCESS':
            console.log('signout success');
            return state;
        case 'JOIN_GROUP_ERROR':
            console.log('signup successs');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer;