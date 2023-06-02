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
        img: "https://firebasestorage.googleapis.com/v0/b/samurai-d86ce.appspot.com/o/images%2FScreen%20Shot%202023-06-01%20at%2010.50.07%20AM_576x691.jpeg?alt=media&token=8c474a15-0fe0-4734-bdf9-9e11a6294857&_gl=1*x9t05h*_ga*MTA1MTg5MzY5Ni4xNjgwOTA5ODgy*_ga_CW55HF8NVT*MTY4NTYzNjMwOS4xNi4xLjE2ODU2MzgyNTIuMC4wLjA.",
        education: {degree: "Computer Science", graduation_year: "2023", institution: "Stanford"},
        created_at: new Date()
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
  }
}
