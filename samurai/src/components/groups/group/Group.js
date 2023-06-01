import React, { useState, useEffect, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../../config/fbConfig";
import { connect } from 'react-redux';
import './../Groups.css'
//Import user


const Group = (props) => {
    const {auth, group_id, id} = props;
    const [idx, setIdx] = useState(0); //Couter to display user
    const [users, setUsers] = useState(null)

    useEffect(async () => { 
        // Get members of group (algolia)
        const members = await getMembers();
        // Get seen users (firebase)
        const seen_users = await getSeenUsers();
        // Filter members based on seen users
        filterMembers(members, seen_users);
    }, [])

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

    const filterMembers = (members, seen_users) => {
        const result = members.filter(item => !seen_users.includes(item) && item != auth.uid);
        setUsers(result);
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
    const swipe = async (user_id, direction) => {
        // Increase idx
        setIdx(idx + 1);
        // Trigger action to add user it to seen_users
        if(direction == 1){
            const hasMatch = await hasMatch();
            // Check if auth.uid exists in the other user's matches
            if(hasMatch){
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

    
    return(
        <div className="container mt-4">
            <div className="profile-container mt-3">

            </div>
        </div>
    )
    
    
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