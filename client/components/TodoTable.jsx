import React from 'react';
import {Link} from 'react-router';
import $ from 'jQuery';

import TodoTr from 'TodoTr';

class TodoTable extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let {todos} = this.props;

    var renderTodosRows = () =>{
      if(todos && Array.isArray(todos)){
        return todos.map((todo) => {
          return ( <TodoTr key={todo._id} {...todo} /> )
        })
      }
    }
    return (
        <div className="row">
          <div className="col-md-12 mainContainer mainFormContainer todoTableContainer">
            <h4>Todos List<Link to="/todo/add" activeClassName="active"><span className="glyphicon glyphicon-plus-sign addLink" title="Add todo"></span></Link></h4>
            <table className="table table-bordered table-hovered todosTable" id="todosTable">
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Created At</td>
                  <td>Completed</td>
                  <td>Completed At</td>
                  <td>Operations</td>
                </tr>
              </thead>
              <tbody>
                {renderTodosRows()}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default TodoTable;
