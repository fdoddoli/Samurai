import React from 'react';
import GroupSummary from './GroupSummary';

const GroupList = (props) => {

    const {groups, profiles, getProfile} = props;

    if(groups.length > 0){
        return(
            <div>
                {groups && groups.map(group => {
                    return (
                        <div key={group.group_id}>
                            <GroupSummary id={group.id} group_id={group.group_id} profile_id={group.profile_id} profiles={profiles} getProfile={getProfile}/>
                        </div>  
                    )
                })}
            </div> 
        )
    }
    else{
        return(
            <div className="">
                <p>No Groups to Display</p>
            </div>
        ); 
        
    }
}

export default GroupList;