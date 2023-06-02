import React, { useState, useEffect, useRef} from 'react';
import algoliasearch from 'algoliasearch';
import GroupList from './GroupList'
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import { connect } from 'react-redux';
import JoinGroupModal from './JoinGroupModal';
import {joinGroup} from '../../store/actions/groupActions';
import {selectProfile} from '../../store/actions/profileActions';
import './Groups.css';

const application_api_key = process.env.REACT_APP_ALGOLIA_API_KEY;
const index_api_key = process.env.REACT_APP_ALGOLIA_INDEX_API_KEY;
const algolia_index_groups = 'Groups';
const client_groups = algoliasearch(application_api_key, index_api_key);
const groups_index = client_groups.initIndex(algolia_index_groups);

const Groups = (props) => {
    const {auth, joinGroup, selectProfile} = props;
    const [queryGroups, setQueryGroups] = useState("");
    const [queryProfiles, setQueryProfiles] = useState("");
    const [groups] = useCollectionData(queryGroups);
    const [profiles] = useCollectionData(queryProfiles);

    useEffect(() => { 
        const queryGroups = firebase.firestore().collection('Users').doc(auth.uid).collection('Groups');
        const queryProfiles = firebase.firestore().collection('Users').doc(auth.uid).collection('Profiles');
        setQueryGroups(queryGroups)
        setQueryProfiles(queryProfiles)
    }, [])

    // Function to get group with the given code and trigger action to join group
    const getGroup = async (code) => {
        const filter = "code:" + code; 
        const group = await groups_index.search("", {filters: filter, hitsPerPage: 1});
        if(group.hits){
            const group_id = group.hits[0].objectID
            if(group.hits[0].members.indexOf(auth.uid) > -1){
                console.log("Already in group")
            }
            else{
                joinGroup(group_id, auth.uid);
            }
        }
    }

    // Function to change user's profile in group
    const getProfile = (group_id, profile_id) => {
        selectProfile(auth.uid, group_id, profile_id)
    }

    if(groups){
        return(
            <div className="container mt-4">
                <JoinGroupModal getGroup={getGroup}/>

                {/* Join Existing Group */}
                <div className="btn btn-join-group" data-bs-toggle="modal" data-bs-target="#joinGroupModal">
                    Join Group
                </div>

                {/* Group List */}
                <GroupList groups={groups} profiles={profiles} getProfile={getProfile}/>
            </div> 
        );
    }
    else{
        return(
            <div className="container spinner">
                <div class="spinner-border spinner-color" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        joinGroup: (group_id, user_id) => dispatch(joinGroup(group_id, user_id)),
        selectProfile: (user_id, group_id, profile_id) => dispatch(selectProfile(user_id, group_id, profile_id))
    }
}
  
  

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
