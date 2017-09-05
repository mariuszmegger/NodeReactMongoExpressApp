import React from 'react';
import Moment from 'moment';
// const {ObjectID} = require('mongodb');

import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import TodoTdOperators from 'TodoTdOperators';

class TodoTr extends React.Component {
  constructor(props){
    super(props);
  }
  deleteTodo(id){
    return this.props.deleteTodo(id);
  }
  render(){
    let {_id, text, completed, completedAt, createdAt} = this.props
    return (
      <tr>
        <td>{text}</td>
        <td>{createdAt}</td>
        <td>{(completed)? <span className="glyphicon glyphicon-ok"></span> : <span className="glyphicon glyphicon-minus"></span>}</td>
        <td>{(completedAt)? Moment(completedAt).format("MM/DD/YYYY"): <span className="glyphicon glyphicon-minus"></span>}</td>
        <TodoTdOperators id={_id} deleteTodo={this.deleteTodo.bind(this)}/>
      </tr>
    );
  }
}

TodoTr.defaultProps = {

};

TodoTr.propTypes = {

}
export default TodoTr;
