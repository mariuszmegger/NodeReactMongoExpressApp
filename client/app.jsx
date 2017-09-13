import React  from 'react';
import ReactDOM  from 'react-dom';
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import {Provider} from 'react-redux';

var store = require('configureStore').configure();
import actions from 'actions';
import TodoApp from 'TodoApp';
import UserAPI from 'UserAPI';
import Todos from 'Todos';
import AddTodo from 'AddTodo';
import EditTodo from 'EditTodo';
import Login from 'Login';
import Dashboard from 'Dashboard';


require('style!css!sass!applicationStyles')
// require('style!css!bootstrap/dist/css/bootstrap.min.css')

store.subscribe(() => {
  var state = store.getState();
  // console.log('New state', state);
});

function requireAuth(nextState, replace){
  let userAPI = new UserAPI;
  userAPI.checkUserAuth();
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={TodoApp} >
        <Route path="login" component={Login}/>
        <Route path="todos" component={Todos} onEnter={requireAuth}/>
        <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
        <Route path="todo/add" component={AddTodo} onEnter={requireAuth}/>
        <Route path="todo/edit/:id" component={EditTodo} onEnter={requireAuth}/>
        <IndexRoute component={Login} ></IndexRoute>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
