import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import './Auth.css';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.signIn(this.state);
  }

  componentDidMount(){  
    window.scrollTo(0, 0);
  }

  render() {
    const {auth, auth_error} = this.props;
    // if (auth.uid) return <Redirect to ='/'/>
    return (
        <div>
          <div className="container position-relative start-50 translate-middle sign-in-form row">
              {/* Titulo */}
              <h3 className = "text-black title">Sign In</h3>
            
              <form className="mt-4 col-11">
                  {/* Email */}
                  <div className="mb-4">
                      <label for="email" class="form-label">Email</label>
                      <input onChange={this.handleChange} className="input form-control" type="email" id="email"/>
                  </div>
                  
                  {/* Password */}
                  <div className="mb-4">
                      <label for="password" class="form-label">Password</label>
                      <input onChange={this.handleChange} type="password" className="input form-control" id="password"/>
                  </div>

                  {/* Submit Button */}
                  <div className="">
                      <button onClick={this.handleSubmit} type="button" class="btn btn-sign-in">Sign In</button>
                      <div className="signIn-error">
                        { auth_error ? <p>{auth_error}</p> : null}
                      </div>
                  </div>
              </form>
          </div>
        </div>
        
        
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth_error: state.auth.authError,
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
