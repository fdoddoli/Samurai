import React, { useState, useEffect, useRef} from 'react';
import algoliasearch from 'algoliasearch';
import GroupList from './GroupList'
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import { connect } from 'react-redux';
import JoinGroupModal from './JoinGroupModal';
import {joinGroup} from '../../store/actions/groupActions';
import './Groups.css';

const application_api_key = "3DPMYV4PP8";
const index_api_key = "5b0f0dbda9b8facc273880f5c935a0ec";
const algolia_index_groups = 'Groups';
const client_groups = algoliasearch(application_api_key, index_api_key);
const groups = client_groups.initIndex(algolia_index_groups);

const Groups = (props) => {
    const {auth, joinGroup} = props;
    const [query, setQuery] = useState("");
    const [group] = useCollectionData(query);

    useEffect(() => { 
        const query = firebase.firestore().collection('Users').doc(auth.uid).collection('Groups');
        setQuery(query);
    }, [])

    // Function to get group with the given code and trigger action to join group
    const getGroup = async (code) => {
        const filter = "code:" + code; 
        const group = await groups.search("", {filters: filter, hitsPerPage: 50});
        if(group.hits){
            const group_id = group.hits[0].objectID;
            if(group.hits[0].members.indexOf(auth.uid) > -1){
                console.log("Already in group")
            }
            else{
                joinGroup(group_id, auth.uid);
            }
            
        }
    }

    if(group){
        return(
            <div className="container mt-4">
                <JoinGroupModal getGroup={getGroup}/>

                {/* Join Existing Group */}
                <div className="btn btn-join-group" data-bs-toggle="modal" data-bs-target="#joinGroupModal">
                    Join Group
                </div>

                {/* Group List */}
                <GroupList groups={group} />
            </div> 
        );
    }
    else{
        return(
            <div className="container">
                Loading...
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
        joinGroup: (group_id, user_id) => dispatch(joinGroup(group_id, user_id))
    }
}
  
  

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
