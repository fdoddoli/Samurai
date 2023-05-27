import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {
  render(){
    const {auth, profile} = this.props;
    return(
      <BrowserRouter>
        <div className="App notranslate" lang="es" translate="no">
          <Navbar />
            <Switch>
              <Route path="/signin" component={SignIn} />
            </Switch>
          </div>
          {/* Footer
          BottomNav */}
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