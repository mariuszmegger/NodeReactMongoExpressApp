import React from 'react';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import TodoTdOperators from 'TodoTdOperators';


class TodoTr extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let {_id, text, completed, completedAt} = this.props
    return (
      <tr>
        <td>{_id}</td>
        <td>{text}</td>
        <td>Created At</td>
        <td>{(completed)? 'YES' : 'NO'}</td>
        <td>{(completedAt)? completedAt : '------'}</td>
        <TodoTdOperators />
      </tr>
    );
  }
}

TodoTr.defaultProps = {

};

TodoTr.propTypes = {

}
export default TodoTr;
