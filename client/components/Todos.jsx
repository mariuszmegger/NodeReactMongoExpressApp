import React from 'react';
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import $ from 'jQuery';

import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import TodoTable from 'TodoTable';
import TodoSearch from 'TodoSearch';

class Todos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      completed:'no',
      message:''
    }
    this.getTodos = this.getTodos.bind(this);
  }

  componentWillMount(){
    this.getTodos(this.state.completed)
    //  .then((res) => {
    //    this.setState({todos: res.data.todos});
    //  })
    //  .catch(function (error) {
    //    console.log(error);
    //  });
  }

  getTodos(completed){
    this.setState({completed: completed});
    if (completed === 'yes'){
      completed = true;
    }else if(completed === 'no'){
      completed = false;
    }else{
      completed = 'xxx'
    }

    var TodoAPIVar = new TodoAPI();
    return TodoAPIVar.getTodos(completed).then((res) => {
      this.setState({todos: res.data.todos});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  addTodo(todo){
    var TodoAPIVar = new TodoAPI();
    return TodoAPIVar.addTodo(todo).then((todo) => {
      // this.setState({
      //   message: 'Todo Added'
      // })
      if(todo){
        hashHistory.push('/todos');
      }

    }).catch((e) => {
      console.log(e);
    });
  }
  deleteTodo(id){
    var TodoAPIVar = new TodoAPI();
    return TodoAPIVar.deleteTodo(id).then((res) => {
      return res;
      console.log(res.data.text, 'usunięty.');
    }).catch((e) => {

    })
  }
  render(){
    let  {todos, message, completed} = this.state;
    // console.log(message);
    return (
      <div className="container">
        <div className="row">
          {message.length > 0 &&
            <div className="alert alert-success" role="alert">...</div>
          }
          <TodoSearch completed={completed} onChange={this.getTodos}/>
          <TodoTable todos={todos} addTodo={this.addTodo} deleteTodo={this.deleteTodo}/>
        </div>
      </div>
    );
  }
}

Todos.defaultProps = {
  completed: false
};

Todos.propTypes = {

}
export default Todos;
