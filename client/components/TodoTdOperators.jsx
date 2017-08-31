import React from 'react';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import {Link, IndexLink} from 'react-router';


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
    let {id} = this.props
    return (
        <td><Link to={'/todo/edit/'+id}><span className="glyphicon glyphicon-edit"></span></Link><span className="glyphicon glyphicon-remove"></span></td>
    );
  }
}

TodoList.defaultProps = {

};

TodoList.propTypes = {

}
export default TodoList;
