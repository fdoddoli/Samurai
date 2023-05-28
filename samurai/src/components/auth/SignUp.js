import React, { Component } from 'react'
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


class SignUp extends Component {

  state = {
    first_name: '',
    last_name: "",
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
    this.props.signUp(this.state);
  }

  componentDidMount(){  
    window.scrollTo(0, 0);
  }

  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to ='/'/>
    return (
        <div>
            <div className="container position-relative start-50 translate-middle sign-up-form row">
                <h3 className = "text-black title">Create Account</h3>  
                <form className="mt-3 col-11">
                    {/* First Name */}
                    <div className="mb-4">
                        <label for="first_name" class="form-label">First Name</label>
                        <input onChange={this.handleChange} type="text" placeholder="First Name" class="input form-control" id="first_name"/>
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <label for="last_name" class="form-label">Last Name</label>
                        <input onChange={this.handleChange} type="text" placeholder="Last Name" class="input form-control" id="last_name"/>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label for="email" class="form-label">Email</label>
                        <input onChange={this.handleChange} type="email" placeholder="Email" class="input form-control" id="email"/>
                    </div>
            
                    {/* Password */}
                    <div className="mb-4">
                        <label for="password" class="form-label">Password</label>
                        <input onChange={this.handleChange} type="password" placeholder="Greater than 6 Characters" class="input form-control" id="password"/>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button onClick={this.handleSubmit} type="button" class="btn btn-sign-in">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
        )
    } 
}


const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);