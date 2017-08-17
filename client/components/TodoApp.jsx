import React from 'react';
import Nav from 'Nav';

class TodoApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <Nav />
          <div>
            <h3>Main Component</h3>
          </div>
          {this.props.children}
        </div>
    </div>
    );
  }
}

TodoApp.defaultProps = {

};

TodoApp.propTypes = {

}
export default TodoApp;
