import authReducer from './authReducer';
import profileReducer from './profileReducer';
import groupReducer from './groupReducer'
import { combineReducers } from 'redux';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  group: groupReducer,
  firestore: firestoreReducer, //synced firestore data with app
  firebase: firebaseReducer //synced auth status with app
});

export default rootReducer;