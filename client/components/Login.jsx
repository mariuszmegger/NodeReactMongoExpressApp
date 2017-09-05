import React from 'react';

import Nav from 'Nav';
import UserAPI from 'UserAPI';

class Login extends React.Component {
  constructor(props){
    super(props);
    let userAPI = new UserAPI;
      this.state = {
      }
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div>
            <h3>Dashboard</h3>
          </div>
        </div>
    </div>
    );
  }
}

export default Login;
