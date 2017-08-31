import React from 'react';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import Todos from 'Todos';
import EditTodoForm from 'EditTodoForm';


class EditTodo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      completed:'',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
    this.editSingleTodo = this.editSingleTodo.bind(this)
  }
  handleInputChange(e){
    this.setState({text: e.target.value});
  }

  handleCheckboxClick(e){

      console.log(e.target.value);
    this.setState({completed: !this.state.completed });
      console.log(this.state);
  }

  componentWillMount(){
    this.getSingleTodo(this.props.params.id)
     .then((res) => {
       this.setState({text: res.data.todo.text, completed: res.data.todo.completed});
     })
     .catch(function (error) {
       console.log(error);
     });
  }
  getSingleTodo(id){
    let todoAPI = new TodoAPI();
    return  todoAPI.getSingleTodo(id).then((todo)=>{
      return todo;
    }).catch((e)=>{
      return e;
    })
  }
  editSingleTodo(e){
    e.preventDefault();
    let todoAPI = new TodoAPI();
    console.log(this.state);
    todoAPI.updateTodo({
      _id: this.props.params.id,
      text:this.state.text,
      completed: this.state.completed
    }).then((res) => {
      console.log('bbb');
    }).catch((e) => {
      console.log(e);
    });
  }
  render(){
    let {text, completed} = this.state;
    console.log(completed);
    return (
      <div className="container">
        <div className="row">
          <h3>Edit Todo</h3>
          <div className="col-md-6">
            <form ref="form" onSubmit={this.editSingleTodo}>
              <div className="form-group">
                <label for="addTodo">Todo text</label>
                <input name="aaa" type="text" onChange={this.handleInputChange} value={text} className="form-control" id="addTodo" placeholder="Todo text" />
                <div className="checkbox">
                  <label><input type="checkbox" checked={(completed)? 'checked': null} onChange={this.handleCheckboxClick}/>Completed</label>
                </div>
              </div>
              <button type="submit" className="btn btn-default">Edit Todo</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditTodo.defaultProps = {
};

EditTodo.propTypes = {

}
export default EditTodo;
