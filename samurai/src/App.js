import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css'

import Navbar from './components/layout/Navbar';
import BottomNavbar from './components/layout/BottomNavbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Groups from './components/groups/Groups';
import Group from './components/groups/group/Group';
import Profile from './components/profile/Profile';
import Matches from './components/matches/Matches';

class App extends Component {
  render(){
    const {auth, profile} = this.props;
    
    let Dashboard;
    if(auth.uid){
      Dashboard = (
        <Route exact path="/" component={Groups} />
      );
    }
    else{
      Dashboard = (
        <Route exact path="/" component={SignIn} />
      );
    }

    let BottomNav
    if(auth.uid && profile.isLoaded){
      BottomNav = <BottomNavbar auth={auth}/>
    }
    else{
      BottomNav = null
    }

    return(
      <BrowserRouter>
        <div className="App notranslate" lang="es" translate="no">
          <Navbar auth={auth} profile={profile}/>
            <Switch>
              {Dashboard}
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/profile" component={Profile} />
              <Route path="/matches" component={Matches} />
              <Route path="/group/:group/:id" component={Group} />
            </Switch>
            {BottomNav}
          </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(App);