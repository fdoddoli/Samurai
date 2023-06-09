import React, { useState, useEffect} from 'react';

const ChooseProfileModal = (props) => {

    const {id, group_id, profile_id, profiles, getProfile} = props;
    const [currentProfile, setCurrentProfile] = useState(profile_id);
    
    let profile_options;
    if(profiles.length > 0){
        profile_options = (
            profiles.map((profile, idx) => {
                return (
                    <option value={profile.id}>{profile.name}</option>
                )
            })
        );
    }
    else{
        profile_options = (
            <div>
                <p>You have no profiles, create one first.</p>
            </div>
        );
    }

    return (
        <div className="modal fade" id="chooseProfileModal" tabindex="-1" aria-labelledby="chooseProfileModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content chooseProfileModal">
                    <div className="modal-body">
                        <form className="mt-4 mb-2">
                            <label for="select-profile" className="form-label select-profile">Select Profile</label>
                            <select onChange={e => setCurrentProfile(e.target.value)} className="form-select" aria-label="No">
                                <option selected>Profiles</option>
                                {profile_options} 
                            </select>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-grey" aria-label="Close" data-bs-dismiss="modal">Close</button>
                        <button  type="button" className="btn btn-choose" onClick={() => getProfile(id, currentProfile)} data-bs-dismiss="modal">Done</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseProfileModal;