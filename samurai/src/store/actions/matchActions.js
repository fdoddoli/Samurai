

export const addMatch = (auth_id, user_id, match) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        console.log(auth_id);
        const firestore = getFirestore();
        return firestore.collection('Users').doc(auth_id).collection("Matches").doc(user_id).set({
                match: match,
                user_id: user_id
        }).then(() => {
            dispatch({ type: 'ADD_MATCH_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'ADD_MATCH_ERROR', err});
        }) 
    }
};

export const updateMatch = (auth_id, user_id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        return firestore.collection('Users').doc(auth_id).collection("Matches").doc(user_id).update({
                match: true
        }).then(() => {
            dispatch({ type: 'UPDATE_MATCH_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'UPDATE_MATCH_ERROR', err});
        }) 
    }
};