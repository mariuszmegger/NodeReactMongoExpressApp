import React from 'react';
import $ from 'jQuery';
import {connect} from 'react-redux';

import * as actions from 'actions';
import UserAPI from 'UserAPI';
import Nav from 'Nav'


class Login extends React.Component {
  constructor(props){
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.showLoginPanel();
  }
  componentDidMount(){
    this.showLoginPanel();
  }

  onRegisterSubmit(e){
    e.preventDefault();
    this.props.registerUser(this.refs.registerEmail.value, this.refs.registerPassword.value);
  }

  onLoginSubmit(e){
    e.preventDefault();
    this.props.loginUser(this.refs.loginEmail.value, this.refs.loginPassword.value);
  }

  showLoginPanel(){
    $('.registerUser').hide();
    $('.loginUser').fadeIn(800);

    $('.registerLoginPanelRight').removeClass('cliked');
    $('.registerLoginPanelLeft').addClass('cliked');

  }
  showRegisterPanel(){
    $('.loginUser').hide();
    $('.registerUser').fadeIn(800);

    $('.registerLoginPanelLeft').removeClass('cliked');
    $('.registerLoginPanelRight').addClass('cliked');

  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-5 registerLoginPanel">
            <div onClick={this.showLoginPanel} className="registerLoginPanelLeft col-md-6"><h4>Login</h4></div>
            <div onClick={this.showRegisterPanel}className="registerLoginPanelRight col-md-6"><h4>Register</h4></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-5 mainFormContainer mainContainer registerUser">
            <h4>Register User</h4>
            <form ref="form" onSubmit={this.onRegisterSubmit.bind(this)}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" ref="registerEmail"/>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref="registerPassword"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          <div className="col-md-5 mainFormContainer mainContainer loginUser">
            <h4>Login User</h4>
            <form ref="form" onSubmit={this.onLoginSubmit.bind(this)}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" ref="loginEmail"/>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref="loginPassword"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, actions)(Login);
