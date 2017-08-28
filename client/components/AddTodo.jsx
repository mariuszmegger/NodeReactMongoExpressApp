import React from 'react';
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
          <h3>Add new Todo</h3>
          <div className="col-md-6">
            <form ref="form" onSubmit={this.addTodo.bind(this)}>
              <div className="form-group">
                <label for="addTodo">Todo text</label>
                <input type="text" className="form-control" id="addTodo" placeholder="Todo text" ref="todoText"/>
              </div>
              <button type="submit" className="btn btn-default">Add Todo</button>
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
