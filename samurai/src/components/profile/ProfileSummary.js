import React, { useState, useEffect, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import ViewProfileModal from '../profile/ViewProfileModal';
import './Profile.css'

const ProfileSummary = (props) => {

    const {profile, generalInformation} = props;

    return(
        <div className="container mt-4">
            <ViewProfileModal profile={profile} generalInformation={generalInformation} />
            <div className="profile-box row" data-bs-toggle="modal" data-bs-target="#viewProfileModal">
                {/* Group Name */}
                <div className="col-10 profile-name">
                    {profile.name}
                </div>
                {/* Preview */}
                <div className="col">
                    <img src="/img/resume_icon.svg" alt="" className="profile_icon"/>
                </div>
            </div>
        </div> 
    );
    
}

export default ProfileSummary;