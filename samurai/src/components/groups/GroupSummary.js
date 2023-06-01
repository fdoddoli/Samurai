import React, { useState, useEffect, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import algoliasearch from 'algoliasearch';
import ChooseProfileModal from '../profile/ChooseProfileModal';
import {Link} from 'react-router-dom';
import './Groups.css'

const application_api_key = "3DPMYV4PP8";
const index_api_key = "5b0f0dbda9b8facc273880f5c935a0ec";
const algolia_index_groups = 'Groups';
const client_groups = algoliasearch(application_api_key, index_api_key);
const groups_algolia = client_groups.initIndex(algolia_index_groups);

const GroupSummary = (props) => {

    const {id, group_id, profile_id, profiles, getProfile} = props;
    const [group, setGroup] = useState("");


    //Get group with Algolia
    useEffect(async () => {
        let s_group = await groups_algolia.getObject(group_id);
        setGroup(s_group)
    }, []);

    let resume_icon;
    if(profile_id === ""){
        resume_icon = (
            <img src="/img/unfilled_resume_icon.svg" alt="" className="resume_icon"/>
        )
    }
    else{
        resume_icon = (
            <img src="/img/resume_icon.svg" alt="" className="resume_icon"/>
        )
    }
    
    if(group && profiles){
        return(
            <div className="container mt-4">
                <ChooseProfileModal id={id} group_id={group_id} profile_id={profile_id} profiles={profiles} getProfile={getProfile}/>
                <div className="group-box row">
                    <Link to={"/group/" + group_id + "/" + id}  className="col-10 row group-link">
                        {/* Groups Image */}
                        <div className="col group-image-container">
                            <img src={group.img} alt="" className="group-image"/>
                        </div>
                        {/* Group Name */}
                        <div className="col-9 group-name">
                            {group.name}
                        </div>
                    </Link>
                    {/* Profile */}
                    <div className="col" data-bs-toggle="modal" data-bs-target="#chooseProfileModal">
                        {resume_icon}
                    </div>
                </div>
            </div> 
        )
    }
    else{
        return(
            <div>
                <h6>loading...</h6>
            </div> 
        )
    }
    
}

export default GroupSummary;