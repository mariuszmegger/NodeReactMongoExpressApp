import React from 'react';
import {Link, IndexLink} from 'react-router';

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
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
                <a className="navbar-brand" href="#">Brand</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><IndexLink to="/" activeClassName="active" >Todos <span className="sr-only">(current)</span></IndexLink></li>
                  <li><Link to="/users" activeClassName="active">Users</Link></li>
                </ul>
                <form className="navbar-form navbar-right">
                  <div className="form-group">
                    <span>Login:</span><input type="email" className="form-control" placeholder="Email"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password"/>
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Logout</a></li>
                  <li><Link to="/register" activeClassName="active">Register</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    </div>
    );
  }
}

Nav.defaultProps = {

};

Nav.propTypes = {

}
export default Nav;
