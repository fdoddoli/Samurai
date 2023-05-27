import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {
  
  render(){

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

export default App;