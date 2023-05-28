export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      //make async call to database
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' })
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err})
      });
    };
  };

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS'});
    });
  }
}

export const signUp = (user) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    
    //Crea el usuario en firebase auth y después agrega usuario nuevo a la colección de Usuarios en firestore
    firebase.auth().createUserWithEmailAndPassword(
      user.email,
      user.password
    ).then((resp) => {
      return firestore.collection('Users').doc(resp.user.uid).set({
        first_name: user.first_name,
        last_name: user.last_name,
        created_at: new Date()
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
  }
}
