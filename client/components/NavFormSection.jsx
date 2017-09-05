import React from 'react';
import {Link, IndexLink} from 'react-router';
import UserAPI from 'UserAPI';

class NavFormSection extends React.Component {
  constructor(props){
    super(props);
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
        <div className="navbar-right">
          <form ref="form" onSubmit={this.onSubmit.bind(this)} className="navbar-form ">
            <div className="form-group">
              <span>Login:</span><input type="email" className="form-control" placeholder="Email" ref="email"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" ref="password"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <Link to="/register" activeClassName="active navbar-right"><span className="glyphicon glyphicon-pencil addLink"></span></Link>

        </div>
        )}
      </div>
    );
  }
}
export default NavFormSection;
