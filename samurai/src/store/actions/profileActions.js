
export const selectProfile= (user_id, group_id, profile_id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('Users').doc(user_id).collection("Groups").doc(group_id).update({
            profile_id: profile_id
        }).then(() => {
            dispatch({ type: 'SELECT_PROFILE_SUCCESS'}); 
        }).catch((err) => {
            dispatch({ type: 'SELECT_PROFILE_ERROR', err});
        })
    }
};