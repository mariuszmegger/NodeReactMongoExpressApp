import React  from 'react';
import ReactDOM  from 'react-dom';
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import TodoApp from 'TodoApp';
import Register from 'Register';
import UsersList from 'UsersList';
import UserAPI from 'UserAPI';
import Todos from 'Todos';
import AddTodo from 'AddTodo';
import EditTodo from 'EditTodo';


// var actions = require('actions');
// var store = require('configureStore').configure();

// Load foundation
// require('style!css!foundation-sites/dist/foundation.min.css')
// $(document).foundation();

// App css
// require('style!css!sass!applicationStyles')
// require('style!css!bootstrap/dist/css/bootstrap.min.css')

function requireAuth(nextState, replace){
  let userAPI = new UserAPI;
  userAPI.checkUserAuth().then((res) => {
    if(!res){
      replace({
        pathname: '/register'
      })
    }
  }).catch((e) => {
    console.log(e);
  })
}




ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={TodoApp} >
      <Route path="todos" component={Todos} />
      <Route path="users" component={UsersList} onEnter={requireAuth}/>
      <Route path="register" component={Register}/>
      <Route path="todo/add" component={AddTodo} onEnter={requireAuth}/>
      <Route path="todo/edit/:id" component={EditTodo} onEnter={requireAuth}/>
      <IndexRoute component={Todos} onEnter={requireAuth}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('app')
);
