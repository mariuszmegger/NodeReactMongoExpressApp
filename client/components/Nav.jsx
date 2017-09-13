import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';

import * as actions from 'actions';
import UserAPI from 'UserAPI';

class Nav extends React.Component {

  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout(e){
    e.preventDefault();
    this.props.logoutUser();
  }

  render(){
    let auth = (this.props.auth)? true:false;
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
                  <li><IndexLink to="/dashboard" activeClassName="active" >Dashboard <span className="sr-only">(current)</span></IndexLink></li>
                  <li><Link to="/todos" activeClassName="active" >Todos <span className="sr-only">(current)</span></Link></li>
                </ul>
                {auth ? (
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

function mapStateToProps({auth}){
  return {
    auth
  }
}
export default connect(mapStateToProps, actions)(Nav);
