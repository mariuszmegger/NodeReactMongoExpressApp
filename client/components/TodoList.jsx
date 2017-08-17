import React from 'react';

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <label>Completed:

            </label><select className="form-control">
              <option>True</option>
              <option>False</option>
            </select>
          </div>
          <div className="col-md-12">
            <h3>Active Users List</h3>
            <table className="table table-bordered table-hovered">
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
                <tr>
                  <td>1</td>
                  <td>Walk the dog</td>
                  <td>17.08.2017</td>
                  <td>FALSE</td>
                  <td></td>
                  <td>Complete/Edit/Delete</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Clean Dishes</td>
                  <td>17.08.2017</td>
                  <td>FALSE</td>
                  <td></td>
                  <td>Complete/Edit/Delete</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Have Fun</td>
                  <td>11.08.2017</td>
                  <td>TRUE</td>
                  <td>15.08.2017</td>
                  <td>Complete/Edit/Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

TodoList.defaultProps = {

};

TodoList.propTypes = {

}
export default TodoList;
