import React from 'react';
import {Link, IndexLink} from 'react-router';

import UserAPI from 'UserAPI';
import NavFormSection from 'NavFormSection'

class Nav extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({loggedIn:nextProps.loggedIn});
  }
  onSubmit(email, password){
    var self = this;
    let userAPI = new UserAPI();
    userAPI.loginUser(email, password).then((res) => {
      if(!res){
        throw new Error();
      }
      self.props.update();
    }).catch((e) => {
      alert('User not exists')
    })
  }
  onLogout(){
    let self = this;
    let userAPI = new UserAPI();
    userAPI.logOutUser().then((res) => {
      self.props.update();
    }).catch((e) => {
      alert('User not exists', e)
    })
  }

  render(){
    let {loggedIn} = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" >Brand</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><IndexLink to="/todos" activeClassName="active" >Todos <span className="sr-only">(current)</span></IndexLink></li>
                </ul>
                {loggedIn ? (
                  <ul className="nav navbar-nav navbar-right">
                    <li><a onClick={this.onLogout.bind(this)} href="#">Logout</a></li>;
                  </ul>
                ):(
                  <span></span>
                )}
              </div>
            </div>
          </nav>
        </div>
    </div>
    );
  }
}

export default Nav;
