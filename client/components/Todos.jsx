import React from 'react';
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import TodoTable from 'TodoTable';
import TodoSearch from 'TodoSearch';

class Todos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      message:''
    }
    this.getTodos = this.getTodos.bind(this);
  }

  componentWillMount(){
    this.getTodos()
     .then((res) => {
       this.setState({todos: res.data.todos});
     })
     .catch(function (error) {
       console.log(error);
     });
  }

  getTodos(){
    var TodoAPIVar = new TodoAPI();
    return TodoAPIVar.getTodos()
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
  render(){
    let  {todos, message} = this.state;
    // console.log(message);
    return (
      <div className="container">
        <div className="row">
          {message.length > 0 &&
            <div className="alert alert-success" role="alert">...</div>
          }
          <TodoSearch />
          <TodoTable todos={todos} addTodo={this.addTodo}/>
        </div>
      </div>
    );
  }
}

Todos.defaultProps = {

};

Todos.propTypes = {

}
export default Todos;
