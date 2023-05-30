import React, { useState, useEffect, useRef} from 'react';
import ProfilesList from './ProfilesList'
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import { connect } from 'react-redux';
import './Profile.css';

const Profile = (props) => {
    const {auth, profile} = props;
    const [queryProfiles, setQueryProfiles] = useState("");
    const [profiles] = useCollectionData(queryProfiles);

    useEffect(() => { 
        const queryProfiles = firebase.firestore().collection('Users').doc(auth.uid).collection('Profiles');
        setQueryProfiles(queryProfiles)
    }, [])

    // Function to get and create a new profile
    const getProfile = (profile) => {
        console.log(profile);
    }

    // Function to get and edit general information a new profile
    const editGeneralInformation = (generalInformation) => {
        console.log(generalInformation);
    }

    if(profiles && profile){
        return(
            <div className="container mt-4">
                {/* <generalInformationModal generalInformation={generalInformation} getGeneralInformation={getGeneralInformation}/> */}
                <div className="d-flex section-buttons">
                    {/* Basic Information */}
                    <div className="btn btn-create-profile" data-bs-toggle="modal" data-bs-target="#basicInformationModal">
                        General Info
                    </div>
                    {/* Create New Profile */}
                    <div className="btn btn-create-profile ms-3" data-bs-toggle="modal" data-bs-target="#createProfileModal">
                        Create Profile
                    </div>
                </div>
                {/* Group List */}
                <ProfilesList generalInformation={profile} profiles={profiles} getProfile={getProfile}/>
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
      profile: state.firebase.profile
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
        
//     }
// }
  

export default connect(mapStateToProps, null)(Profile);
