import React, { useState, useEffect, useRef} from 'react';
import GroupList from './GroupList'
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import { connect } from 'react-redux';

const Groups = (props) => {
    const {auth} = props;
    const [query, setQuery] = useState("");
    const [group] = useCollectionData(query);

    useEffect(() => { 
        const query = firebase.firestore().collection('Users').doc(auth.uid).collection('Groups');
        setQuery(query);
    }, [])

    if(group){
        return(
            <div className="container">
                <GroupList groups={group} />
            </div> 
        );
    }
    else{
        return(
            <div className="container">
                Loading...
            </div> 
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
    };
  };
  
  

export default connect(mapStateToProps)(Groups);
