
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

export const addProfileId = (id, user_id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        return firestore.collection('Users').doc(user_id).collection("Profiles").doc(id).set({
            id: id,
        },{ merge: true }).then(() => {
            dispatch({ type: 'CREATED_PROFILE_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'CREATED_PROFILE_ERROR', err});
        }) 
    }
}


export const createProfile= (user_id, profile, highlights) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('Users').doc(user_id).collection("Profiles").add({
            name: profile.name,
            about: profile.about,
            most_impressive_thing: profile.most_impressive_thing,
            interests: profile.interests,
            highlights: highlights
        }).then((docRef) => {
            dispatch(addProfileId(docRef.id, user_id));
        }).catch((err) => {
            dispatch({ type: 'CREATED_PROFILE_ERROR', err});
        })
    }
};

export const addSeenUser = (auth_id, user_id, group_id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('Users').doc(auth_id).collection("Groups").doc(group_id).update({
            seen_users: firebase.firestore.FieldValue.arrayUnion(user_id)
        }).then(() => {
            dispatch({ type: 'ADD_SEEN_USER_SUCCESS'}); 
        }).catch((err) => {
            dispatch({ type: 'ADD_SEEN_USER_ERROR', err});
        })
    }
};
