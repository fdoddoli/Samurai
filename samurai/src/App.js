import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css'

import Navbar from './components/layout/Navbar';
import BottomNavbar from './components/layout/BottomNavbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Groups from './components/groups/Groups';

class App extends Component {
  render(){
    const {auth, profile} = this.props;
    
    let Dashboard;
    if(auth.uid){
      Dashboard = (
        <Route exact path="/" auth={auth} profile={profile} component={Groups} />
      );
    }
    else{
      Dashboard = (
        <Route path="/" auth={auth} component={SignIn} />
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
              <Route path="/signin" auth={auth} component={SignIn} />
              <Route path="/signup" auth={auth} component={SignUp} />
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