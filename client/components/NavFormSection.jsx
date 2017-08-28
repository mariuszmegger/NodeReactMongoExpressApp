import React from 'react';
import {Link, IndexLink} from 'react-router';
import UserAPI from 'UserAPI';

class NavFormSection extends React.Component {
  constructor(props){
    super(props);
  }
  onSubmit(e){
    e.preventDefault();
    this.props.onSubmit(this.refs.email.value, this.refs.password.value)
  }
  onLogout(e){
    e.preventDefault();
    this.props.onLogout(e)
  }

  render(){

    let {loggedIn} = this.props;
    return (
      <div>
        {loggedIn ? (
          <ul className="nav navbar-nav navbar-right">
            <li><a onClick={this.onLogout.bind(this)} href="#">Logout</a></li>;
          </ul>
        ):(
          <form ref="form" onSubmit={this.onSubmit.bind(this)} className="navbar-form navbar-right">
            <div className="form-group">
              <span>Login:</span><input type="email" className="form-control" placeholder="Email" ref="email"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" ref="password"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        )}
      </div>
    );
  }
}
export default NavFormSection;
