import React from 'react';
import {Link} from 'react-router';

import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import Todos from 'Todos';


class AddTodo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: null
    }

    this.addTodo = this.addTodo.bind(this);
  }
  addTodo(e){
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.addTodo(todoText));
    var todos = new Todos();
    todos.addTodo({text:this.refs.todoText.value}).then((res) => {
    }).catch((e) => {
      console.log(e);
    });
  }
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mainContainer mainFormContainer">
            <h4>Add Todo</h4>
            <form ref="form" onSubmit={this.addTodo.bind(this)}>
              <div className="form-group">
                <label for="addTodo">Todo title</label>
                <input type="text" className="form-control" id="addTodo" placeholder="Type title in here" ref="todoText"/>
              </div>
              <button type="submit" className="btn btn-default">Add Todo</button>
              <button className="btn btn-default backButton"><Link to="/todos">Go Back</Link></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddTodo.defaultProps = {

};

AddTodo.propTypes = {

}
export default AddTodo;
