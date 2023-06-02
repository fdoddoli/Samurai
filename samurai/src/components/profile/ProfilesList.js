import React from 'react';
import ProfileSummary from './ProfileSummary';

const ProfilesList = (props) => {

    const {generalInformation, profiles} = props;

    if(profiles.length > 0){
        return(
            <div>
                {profiles && profiles.map(profile => {
                    return (
                        <div key={profile.id}>
                            <ProfileSummary  generalInformation={generalInformation} profile={profile}/>
                        </div>  
                    )
                })}
            </div> 
        )
    }
    else{
        return(
            <div className="container position-relative">
                <div className="position-absolute start-50 translate-middle loading">¡You have no profiles, start by creating one!</div>
            </div> 
        );
    }
}

export default ProfilesList;