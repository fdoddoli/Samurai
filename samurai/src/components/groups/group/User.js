import React, { useState, useEffect, useRef} from 'react';
import HighlightsList from './../../profile/highlights/HighlightsList';
import './../Groups.css'


const User = (props) => {

    const {user, user_id} = props;
    const profile = user.profile;
    const generalInformation = user.generalInformation;
    

    return(
        <div className="profile-container">
            {/* Image, name, education */}
            <div className="section-profile">
                <div className="">
                    <img src={generalInformation.img} alt="" className="profile-img"/>
                </div>
                <div className="btn btn-img-profile mt-3 d-flex">
                    <img src="/img/samurai_logo_icon.svg" alt="" className="logo-icon me-3"/>
                    <div className="profile-btn-text">
                        {generalInformation.first_name + " " + generalInformation.last_name}
                    </div>
                </div>
            </div>
            {/* About */}
            <div className="row mt-4 section">
                <div className="section-title">
                    About
                </div>
                <div className="section-content">
                    {profile.about}
                </div>
            </div>
            {/* Most Impressive Thing */}
            <div className="row mt-4 section">
                <div className="section-title">
                    Most impressive thing
                </div>
                <div className="section-content">
                    {profile.most_impressive_thing}
                </div>
            </div>
            {/* Education */}
            <div className="row mt-4 section">
                <div className="section-title">
                    Education
                </div>
                <div className="section-content">
                    {generalInformation.education.institution + " - " + generalInformation.education.degree + ", " + generalInformation.education.graduation_year}
                </div>
            </div>
            {/* Interests */}
            <div className="row mt-4 section">
                <div className="section-title">
                    Interests
                </div>
                <div className="section-content">
                    {profile.interests}
                </div>
            </div>
            
            {/* Most Impressive Thing */}
            <div className="row mt-4 section">
                <div className="section-title">
                    Highlights
                </div>
                {/* Made this section carousel */}
                <div className="section-content"> 
                    {/* {profile.highlights.lenght > 0 ? <HighlightsList highlights={profile.highlights}/> : null} */}
                    <HighlightsList highlights={profile.highlights}/>
                </div>
            </div>
        </div> 
    )
    
}

export default User;