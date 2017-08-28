import React from 'react';
import Nav from 'Nav';

import UserAPI from 'UserAPI';

class TodoApp extends React.Component {
  constructor(props){
    super(props);
    let userAPI = new UserAPI;
      this.state = {
      }
    // userAPI.checkUserAuth().then((res) => {
    // let  loggedIn = (res)? true:false
    //   this.setState({
    //     loggedIn: loggedIn
    //   })
    // })
  }
  componentWillMount(){
    var loggedIn = (sessionStorage.getItem('x-auth'))? true:false;
    this.setState({loggedIn})
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <Nav loggedIn={this.state.loggedIn}/>
          <div>
            <h3>Main Component</h3>
          </div>
          {this.props.children}
        </div>
    </div>
    );
  }
}

export default TodoApp;
