import React from 'react';
import {Link} from 'react-router-dom';
import './SignedInLinks.css';

const SignedOutLinks = () => {
    
    return(
         <nav className="navbar navbar-expand-md navbar-light fixed">
            <div className="container">
                {/* Logo and Title of Page */}
                <Link to="/">
                    <img src="/img/samurai_logo.svg" alt="" className="logo"/>
                </Link>

                {/* Toggle Botton for mobile nav*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Main Nav */}
                <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul className="navbar-nav sign-out-nav-text">
                        <li className="nav-item ms-0 ms-md-3">
                            <Link to='/signin' className="nav-link"><span className="sign-out-nav-text">Sign In</span></Link>
                        </li>
                        <li className="nav-item ms-0 ms-md-3">
                            <Link to='/signup' className="nav-link"><span className="sign-out-nav-text">Sign Up</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    );
    
}


export default SignedOutLinks;