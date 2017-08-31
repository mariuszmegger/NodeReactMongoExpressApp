import React from 'react';
import {Link, IndexLink} from 'react-router';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';
import TodoTr from 'TodoTr';


class TodoTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    let {todos} = this.props;

    var renderTodosRows = () =>{
      return todos.map((todo) => {
        return ( <TodoTr key={todo._id} {...todo} /> )
      })
    }
    return (
        <div className="row">
          <div className="col-md-12">
            <h3>Todos List<Link to="/todo/add" activeClassName="active"><span className="glyphicon glyphicon-plus addLink"></span></Link></h3>
            <table className="table table-bordered table-hovered" id="todoTable">
              <thead>
                <tr>
                  <td>Id</td>
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

TodoTable.defaultProps = {

};

TodoTable.propTypes = {

}
export default TodoTable;
