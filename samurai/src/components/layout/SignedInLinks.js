import React from 'react';
import {Link} from 'react-router-dom';
import './SignedInLinks.css';
import {signOut} from '../../store/actions/authActions';
import {connect} from 'react-redux';

const SignedInLinksMobile = (props) => {
    const {auth, profile} = props;
    
    if(auth.isLoaded){
        return(
            <nav className="navbar navbar-expand-md navbar-light fixed">
                <div className="container">
                    {/* Logo and Title of Page */}
                    <Link to="/">
                        <img src="/img/samurai_logo.svg" alt="" className="logo"/>
                    </Link>
                    {/* Signout */}
                    <div className="sign-out-container">
                        <Link to="/" onClick={() => props.signOut()} className="sign-out-text">
                            <i class="bi bi-box-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }else{
        return(
            <div className="container spinner">
                <div class="spinner-border spinner-color" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        ); 
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinksMobile);