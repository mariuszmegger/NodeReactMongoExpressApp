import React from 'react';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';

class TodoSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return (
      <div className="col-md-4">
        <label>Completed:
        </label><select className="form-control">
          <option>True</option>
          <option>False</option>
        </select>
      </div>
    );
  }
}

TodoSearch.defaultProps = {

};

TodoSearch.propTypes = {

}
export default TodoSearch;
