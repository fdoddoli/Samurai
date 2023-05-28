
export const joinGroupUserCollection = (group_id, user_id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        return firestore.collection('Users').doc(user_id).collection("Groups").add({
            group_id: group_id,
            profile_id: ""
        }).then(() => {
            dispatch({ type: 'JOINED_GROUP_SUCCESS'}); 
        }).catch((err) => {
            dispatch({ type: 'JOINED_GROUP_ERROR', err});
        }) 
    }
};

export const joinGroup = (group_id, user_id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('Groups').doc(group_id).get().then(doc => {
            let members = doc.data().members;
            members.push(user_id);
            doc.ref.set({
                members: members
            },{ merge: true });
        }).then(() => {
            dispatch(joinGroupUserCollection(group_id, user_id));
        }).catch((err) => {
            dispatch({ type: 'JOINED_GROUP_ERROR', err});
        }) 
    }
};