import React, { useState, useEffect} from 'react';
import HighlightsList from './highlights/HighlightsList';

const ViewProfileModal = (props) => {

    const {profile, generalInformation} = props;

    return (
        <div className="modal fade" id={"viewProfileModal" + profile.id} tabindex="-1" aria-labelledby="viewProfileModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div className="modal-body view-profile-body">
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
                    <div className="modal-footer">
                        <button type="button" className="btn btn-grey" aria-label="Close" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfileModal;