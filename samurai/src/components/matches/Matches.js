import React, { useState, useEffect, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "../../config/fbConfig";
import { connect } from 'react-redux';
import './Matches.css';
import MatchesList from './MatchesList'


const Matches = (props) => {
    const {auth} = props;
    const [matches, setMatches] = useState([]);

    useEffect(() => { 
        if(matches.length === 0){
            getMatches();
        }
    }, [])

    const getMatches = async () => {
        return firebase.firestore().collection('Users').doc(auth.uid).collection('Matches').where('match', '==', true).get().then((querySnapshot) => {
             if (!querySnapshot.empty) {
                 querySnapshot.docs.forEach(doc => {
                     setMatches([...matches, doc.data()])
                 })
             }
         }).catch((error) => {
             console.log("Error getting document:", error);
         });
     }

    if(matches.length > 0){
        return(
            <div className="container mt-4">
                <div className="matches-title">Matches</div>
                {/* Group List */}
                <MatchesList matches={matches}/>
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

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth
    };
};
  

export default connect(mapStateToProps, null)(Matches);
