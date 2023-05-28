import React from 'react'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import GroupNavbar from './GroupNavbar'

const Navbar = (props) => {
    const {auth, profile} = props;
    let Links;
    if(auth.uid){
        Links = <SignedInLinks auth={auth} profile={profile}/>
    }
    else if(auth.uid && window.location.href.indexOf("groups") > -1){
        Links = <GroupNavbar auth={auth} profile={profile}/>
    }
    else{
        Links = <SignedOutLinks/>
    }

    return(
        <div>
            {auth.isLoaded && profile.isLoaded && Links}
        </div> 
    );
}



export default Navbar;
