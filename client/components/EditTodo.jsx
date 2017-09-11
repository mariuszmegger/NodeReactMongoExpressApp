import React from 'react';
import {hashHistory} from 'react-router';
import {Link} from 'react-router';

import TodoAPI from 'TodoAPI';

// This was intentionaly left in React without Redux to show some basic React code.

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

  handleCheckboxClick(){
    this.setState({completed: !this.state.completed });
  }

  componentWillMount(){
    this.getSingleTodo(this.props.params.id)
     .then((res) => {
       this.setState({text: res.data.todo.text, completed: res.data.todo.completed});
     })
     .catch((error) => {
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
    todoAPI.updateTodo({
      _id: this.props.params.id,
      text:this.state.text,
      completed: this.state.completed
    }).then((res) => {
      hashHistory.push('/todos');
    }).catch((e) => {
      console.log(e);
    });
  }
  render(){
    let {text, completed} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mainContainer mainFormContainer editFormContainer">
            <h4>Edit Todo</h4>
            <form ref="form" onSubmit={this.editSingleTodo}>
              <div className="form-group">
                <label for="addTodo">Todo title</label>
                <input name="aaa" type="text" onChange={this.handleInputChange} value={text} className="form-control" id="addTodo" placeholder="Type title in here" />
                  <label><input type="checkbox" checked={(completed)? 'checked': null} onChange={this.handleCheckboxClick}/>Completed</label>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
              <button className="btn btn-default backButton"><Link to="/todos">Go Back </Link></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTodo;
