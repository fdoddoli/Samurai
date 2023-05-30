import React from 'react';
import ProfileSummary from './ProfileSummary';

const ProfilesList = (props) => {

    const {generalInformation, profiles, getProfile} = props;

    if(profiles.length > 0){
        return(
            <div>
                {profiles && profiles.map(profile => {
                    return (
                        <div key={profile.id}>
                            <ProfileSummary  generalInformation={generalInformation} profile={profile} getProfile={getProfile}/>
                        </div>  
                    )
                })}
            </div> 
        )
    }
    else{
        return(
            <div className="">
                <p>No Profiles to Display</p>
            </div>
        ); 
        
    }
}

export default ProfilesList;