import React from 'react';
import TodoAPI from 'TodoAPI';
import UserAPI from 'UserAPI';

class TodoSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  onChange(){
    this.props.onChange(this.refs.completedVar.value);
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-12 mainContainer mainFormContainer filterContainer">
          <h4>Filters</h4>
          <label>Search:</label>
          <select value={this.props.completed} onChange={this.onChange.bind(this)} className="form-control" ref="completedVar">
            <option value="">All</option>
            <option value="yes">Completed</option>
            <option value="no">Not Completed</option>
          </select>
        </div>
      </div>
    );
  }
}

TodoSearch.defaultProps = {

};

TodoSearch.propTypes = {

}
export default TodoSearch;
