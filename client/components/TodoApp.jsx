import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import Nav from 'Nav';
import UserAPI from 'UserAPI';

class TodoApp extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props);
    this.props.getLoggedinUser();
  }
  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <Nav />
          {this.props.children}
        </div>
    </div>
    );
  }
}

export default connect(null, actions)(TodoApp);
// {React.cloneElement(this.props.children, {update: this.updateNavbar})}
