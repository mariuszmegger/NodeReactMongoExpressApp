import React from 'react';
import {Link} from 'react-router';
import $ from 'jQuery';
import {connect} from 'react-redux';

import * as actions from 'actions';

class TodoTdOperators extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  deleteTodo(){
    let {id} = this.props
    this.props.deleteTodo(id);
  }
  render(){
    let {id} = this.props
    return (
        <td id={id}><Link to={'/todo/edit/'+id}><span className="glyphicon glyphicon-edit"></span></Link><span onClick={this.deleteTodo.bind(this)} className="glyphicon glyphicon-remove"></span></td>
    );
  }
}

export default connect(null, actions)(TodoTdOperators);
