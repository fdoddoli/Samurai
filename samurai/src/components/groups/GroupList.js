import React from 'react';
import GroupSummary from './GroupSummary';

const GroupList = (props) => {

    const {groups} = props;

    if(groups.length > 0){
        return(
            <div>
                {groups && groups.map(group => {
                    return (
                        <div key={group.group_id}>
                            <GroupSummary group_id={group.group_id} profile={group.profile_id}/>
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