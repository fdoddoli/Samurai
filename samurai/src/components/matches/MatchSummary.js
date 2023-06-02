import React, { useState, useEffect, useRef} from 'react';
import algoliasearch from 'algoliasearch';
import './Matches.css'

const application_api_key = "3DPMYV4PP8";
const index_api_key = "5b0f0dbda9b8facc273880f5c935a0ec";
const algolia_index_users = 'Users';
const client_users = algoliasearch(application_api_key, index_api_key);
const users_algolia = client_users.initIndex(algolia_index_users);

const MatchSummary = (props) => {

    const {match} = props;
    const [user, setUser] = useState(null);

    //Get user with algolia
    useEffect(async () => {
        let user = await users_algolia.getObject(match.user_id);
        setUser(user);
    }, []);

    

    if(user){
        return(
            <div className="container mt-4">
                <div className="match-box row">
                    {/* Person Image */}
                    <div className="col group-image-container">
                        <img src={user.img} alt="" className="match-image"/>
                    </div>
                    {/* Full Name of Person */}
                    <div className="col-9 match-name">
                        {user.first_name + " " + user.last_name}
                    </div>
                </div>
            </div> 
        );
    }
    else{
        return(
            <div className="container spinner">
                <div class="spinner-border spinner-color" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    
}

export default MatchSummary;