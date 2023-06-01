const initState = {
    authError: null
};

const profileReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SELECT_PROFILE_SUCCESS':
            console.log('select profile success');
            return state;
        case 'SELECT_PROFILE_ERROR':
            console.log('select profile error');
            return {
                ...state,
                authError: null
            }
        case 'CREATE_PROFILE_SUCCESS':
            console.log('create profile success');
            return state;
        case 'CREATE_PROFILE_ERROR':
            console.log('create profile error');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default profileReducer;