import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css'

import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

class App extends Component {
  render(){
    const {auth, profile} = this.props;
    return(
      <BrowserRouter>
        <div className="App notranslate" lang="es" translate="no">
          <Navbar auth={auth} profile={profile}/>
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/" auth={auth} component={SignUp} />
            </Switch>
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