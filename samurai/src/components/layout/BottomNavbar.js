import React, { useState, useEffect} from 'react';
import './BottomNavbar.css';
import { connect } from 'react-redux';
import {Link, useHistory, useLocation} from 'react-router-dom';

const BottomNavbar = (props) => {

    const {auth} = props;

    return(
        <nav className="navbar fixed-bottom bottom-navbar" id="bottomNav">
            <div className="container-fluid d-flex navbar-icons">
                <Link to="/" className="btn btn-bottom-navbar">
                    <i className="bi bi-collection icon-bottom-navbar" id="groups"></i>
                    <br></br>
                    Groups
                </Link>
                <Link to="/matches" className="btn btn-bottom-navbar">
                    <i className="bi bi-people icon-bottom-navbar" id="matches"></i>
                    <br></br>
                    Matches
                </Link>
                <Link to={'/profile/' + auth.uid} className="btn btn-bottom-navbar">
                    <i className="bi bi-person-circle icon-bottom-navbar" id="profile"></i>
                    <br></br>
                    Profile
                </Link>
            </div>
        </nav>
    );
}


export default BottomNavbar;

