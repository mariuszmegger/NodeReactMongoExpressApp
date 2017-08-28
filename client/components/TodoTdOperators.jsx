import React from 'react';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';


class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  getTodos(){
    var TodoAPIVar = new TodoAPI();
    return TodoAPIVar.getTodos();
  }
  render(){
    return (
        <td>Complete/Edit/Delete</td>
    );
  }
}

TodoList.defaultProps = {

};

TodoList.propTypes = {

}
export default TodoList;
