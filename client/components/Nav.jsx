import React from 'react';
import {Link, IndexLink} from 'react-router';

import UserAPI from 'UserAPI';
import NavFormSection from 'NavFormSection'

class Nav extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      // loggedIn: (localStorage.getItem('x-auth'))? true:false
      loggedIn: this.props.loggedIn
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  componentWillMount(){
    console.log('Nav mounted');
  }
  onSubmit(email, password){
    let userAPI = new UserAPI();
    userAPI.loginUser(email, password).then((res) => {
      if(!res){
        throw new Error();
      }
      this.setState({
        loggedIn: true
      })
    }).catch((e) => {
      alert('User not exists', e)
    })
  }
  onLogout(){
    let userAPI = new UserAPI();
    userAPI.logOutUser().then((res) => {
      this.setState({
        loggedIn: false
      });
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
                <a className="navbar-brand" href="#">Brand</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><IndexLink to="/" activeClassName="active" >Todos <span className="sr-only">(current)</span></IndexLink></li>
                  <li><Link to="/users" activeClassName="active">Users</Link></li>
                </ul>
                <NavFormSection onSubmit={this.onSubmit} onLogout={this.onLogout} loggedIn={loggedIn}/>
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
