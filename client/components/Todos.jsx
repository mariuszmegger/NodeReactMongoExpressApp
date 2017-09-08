import React from 'react';
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import $ from 'jQuery';
import {connect} from 'react-redux';

import * as actions from 'actions';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import TodoTable from 'TodoTable';
import TodoSearch from 'TodoSearch';

class Todos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      completed:'no',
    }
    this.getTodos = this.getTodos.bind(this);
  }
  componentWillMount(){
    this.getTodos('no')
  }

  getTodos(completed){
    if (completed === 'yes'){
      completed = true;
    }else if(completed === 'no'){
      completed = false;
    }else{
      completed = 'xxx'
    }
    this.props.getTodos(completed);
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
    let  {todos, completed} = this.props;
    console.log(completed);
    return (
      <div className="container">
        <div className="row">
          <TodoSearch completed={completed} onChange={this.getTodos}/>
          <TodoTable todos={todos} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({todos, completed}){
  console.log(completed);
  return {
    todos,
    completed
  }
}
export default connect(mapStateToProps, actions)(Todos);
