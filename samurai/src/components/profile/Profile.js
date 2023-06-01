import React, { useState, useEffect, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import { connect } from 'react-redux';
import './Profile.css';
import ProfilesList from './ProfilesList'
import CreateProfileModal from './CreateProfileModal';
import {createProfile} from '../../store/actions/profileActions';


const Profile = (props) => {
    const {auth, profile, createProfile} = props;
    const [queryProfiles, setQueryProfiles] = useState("");
    const [profiles] = useCollectionData(queryProfiles);

    useEffect(() => { 
        const queryProfiles = firebase.firestore().collection('Users').doc(auth.uid).collection('Profiles');
        setQueryProfiles(queryProfiles)
    }, [])

    // Function to get and create a new profile
    const getProfile = (profile, highlights) => {
        console.log(profile);
        createProfile(auth.uid, profile, highlights);
    }

    // Function to get and edit general information a new profile
    const editGeneralInformation = (generalInformation) => {
        console.log(generalInformation);
    }

    if(profiles && profile){
        return(
            <div className="container mt-4">
                <CreateProfileModal getProfile={getProfile}/>
                {/* <generalInformationModal generalInformation={generalInformation} getGeneralInformation={getGeneralInformation}/> */}
                <div className="d-flex section-buttons">
                    {/* Basic Information */}
                    <div className="btn btn-create-profile btn-disabled">
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

const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (user_id, profile, highlights) => dispatch(createProfile(user_id, profile, highlights)) 
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
