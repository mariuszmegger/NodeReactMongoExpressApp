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
    this.updateNavbar = this.updateNavbar.bind(this);
  }
  componentWillMount(){
    this.updateNavbar();
  }
  updateNavbar(){
    let userAPI = new UserAPI();
    userAPI.checkUserAuth().then((res) => {
    let  loggedIn = (res)? true:false
      this.setState({
        loggedIn: loggedIn
      })
    })
  }
  render(){
    console.log(this.state.loggedIn);
    return (
      <div className="container-fluid">
        <div className="row">
          <Nav loggedIn={this.state.loggedIn} update={this.updateNavbar}/>
          {React.cloneElement(this.props.children, {update: this.updateNavbar})}
        </div>
    </div>
    );
  }
}

export default TodoApp;
