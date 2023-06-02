import React from 'react';
import MatchSummary from './MatchSummary';

const MatchesList = (props) => {

    const {matches} = props;

    if(matches.length > 0){
        return(
            <div>
                {matches && matches.map(match => {
                    return (
                        <div key={match.user_id}>
                            <MatchSummary  match={match}/>
                        </div>  
                    )
                })}
            </div> 
        )
    }
    else{
        return(
            <div className="">
                <p>No Matches to Display</p>
            </div>
        ); 
        
    }
}

export default MatchesList;