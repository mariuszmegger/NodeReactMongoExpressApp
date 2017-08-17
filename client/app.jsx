import React  from 'react';
import ReactDOM  from 'react-dom';
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import TodoApp from 'TodoApp';
import Register from 'Register';
import TodoList from 'TodoList';
import UsersList from 'UsersList';


// var actions = require('actions');
// var store = require('configureStore').configure();

// Load foundation
// require('style!css!foundation-sites/dist/foundation.min.css')
// $(document).foundation();

// App css
// require('style!css!sass!applicationStyles')
// require('style!css!bootstrap/dist/css/bootstrap.min.css')
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={TodoApp}>
      <Route path="todos" component={TodoList}/>
      <Route path="users" component={UsersList}/>
      <Route path="register" component={Register}/>
      <IndexRoute component={TodoList}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('app')
);
