import React, { useState, useEffect, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../../config/fbConfig";
import { connect } from 'react-redux';
import './../Groups.css';
import './../../../App.css';
import User from './User';


const Group = (props) => {
    const {auth, group_id, id} = props;
    const [idx, setIdx] = useState(null); //Couter to display user
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState({profile: null, generalInformation: null});

    useEffect(async () => { 
        // Get members of group (algolia)
        const members = await getMembers();
        // Get seen users (firebase)
        const seen_users = await getSeenUsers();
        // Filter members based on seen users
        const result = await filterMembers(members, seen_users);
        setUsers(result);
        setIdx(0);
    }, [])

     useEffect(() => {
        if(users != null){
            getUser();
        }
     }, [idx]);


    const getMembers = () => {
        return firebase.firestore().collection('Groups').doc(group_id).get().then((doc) => {
            if (doc.exists) {
                return doc.data().members;
            } else {
                console.log("No such document");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const getSeenUsers = () => {
        return firebase.firestore().collection('Users').doc(auth.uid).collection('Groups').doc(id).get().then((doc) => {
            if (doc.exists) {
                return doc.data().seen_users;
            } else {
                console.log("No such document");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const getUserGeneralInformation = () => {
        return firebase.firestore().collection('Users').doc(users[idx]).get().then((doc) => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const getUserProfileID = async () => {
       return firebase.firestore().collection('Users').doc(users[idx]).collection('Groups').where('group_id', '==', group_id).get().then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return doc.data().profile_id;
            }
            else{
                console.log('Tracking ID not found in DB');
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const getUserProfile = async () => {
        const profile_id = await getUserProfileID();
        return firebase.firestore().collection('Users').doc(users[idx]).collection('Profiles').doc(profile_id).get().then((doc) => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const getUser = async () => {
        const profile = await getUserProfile();
        const generalInformation = await getUserGeneralInformation();
        setUser({profile: profile, generalInformation: generalInformation});
    }

    const filterMembers = async (members, seen_users) => {
        const result = await members.filter(item => !seen_users.includes(item) && item != auth.uid);
        return result;
    }

    const hasMatch = (user_id) => {
        return firebase.firestore().collection('Users').doc(user_id).collection('Matches').doc(auth.uid).get().then((doc) => {
            if (doc.exists) {
                return true;
            } else {
                return false;
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    // Function that triggers when user swipes another user
    // Direction is 0 or 1, representing if the user swiped left or right, respectively
    // seen_users varies between groups, as users can have different profiles and the opinion of a user about someone can change in a different setting
    // matches do not vary between groups, as they represent a connection between 2 people
    const swipe = async (direction) => {
        // Increase idx
        setIdx(idx + 1);
        // Trigger action to add user it to seen_users
        if(direction == 1){
            const match_exists = await hasMatch(users[idx]);
            // Check if auth.uid exists in the other user's matches
            if(match_exists){
                // If it exits, and bool value is false, then update the other user's match to true AND add this match to the user
                console.log("addMatch with true to user")
                console.log("update match with true")
            }
            else{
                // If it does not exist, then add this match to the user with false
                console.log("addMatch with false")
            }      
        }
    }

    if(user.profile != null && (idx < users.length || idx == 0)){
        return(
            <div className="container position-relative mt-4 margin-bottom-profile">
                <div className="">
                    <User user={user}/>
                </div>
                <div className="position-fixed top-50 start-0 translate-middle">
                    <button className="btn btn-swipe left" onClick={() => swipe(0)}>Left</button>
                </div>
                <div className="position-fixed top-50 start-100 translate-middle">
                    <button className="btn btn-swipe right" onClick={() => swipe(1)}>Right</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="container position-relative">
                <div className="position-absolute start-50 translate-middle loading">¡No users left to match with!</div>
            </div> 
        );
    }
}

// Map dispatch to props to get auth
const mapStateToProps = (state, ownProps) => {
    const group_id = ownProps.match.params.group;
    const id = ownProps.match.params.id;

    return {
        group_id: group_id,
        id: id,
        auth: state.firebase.auth
    };
};


// const mapDispatchToProps = (dispatch) => {
//     return {
        
//     }
// }
  

export default connect(mapStateToProps, null)(Group);