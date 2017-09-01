import React from 'react';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import {Link, IndexLink} from 'react-router';
import $ from 'jQuery';


class TodoTdOperators extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  getTodos(){
    var TodoAPIVar = new TodoAPI();
    return TodoAPIVar.getTodos();
  }
  deleteTodo(){
    let {id} = this.props
    return this.props.deleteTodo(id).then((res) => {
      if(res.data){
        $('#'+id).parent('tr').hide(400);
      }
    })
  }
  render(){
    let {id} = this.props
    return (
        <td id={id}><Link to={'/todo/edit/'+id}><span className="glyphicon glyphicon-edit"></span></Link><span onClick={this.deleteTodo.bind(this)} className="glyphicon glyphicon-remove"></span></td>
    );
  }
}

TodoTdOperators.defaultProps = {

};

TodoTdOperators.propTypes = {

}
export default TodoTdOperators;
