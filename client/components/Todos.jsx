import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import TodoTable from 'TodoTable';
import TodoSearch from 'TodoSearch';

class Todos extends React.Component {
  constructor(props){
    super(props);
    this.getTodos = this.getTodos.bind(this);
  }
  componentWillMount(){
    this.props.setCompleted('no');
    this.getTodos('no');
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
  render(){
    let  {todos} = this.props;
    return (
      <div className="container">
        <div className="row">
          <TodoSearch onChange={this.getTodos}/>
          <TodoTable todos={todos} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({todos, completed}){
  return {
    todos,
    completed
  }
}
export default connect(mapStateToProps, actions)(Todos);
