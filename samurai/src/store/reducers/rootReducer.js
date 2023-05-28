import authReducer from './authReducer';
import groupReducer from './groupReducers'
import { combineReducers } from 'redux';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";


const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  firestore: firestoreReducer, //synced firestore data with app
  firebase: firebaseReducer //synced auth status with app
});

export default rootReducer;