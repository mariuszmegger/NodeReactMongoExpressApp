const redux = require('redux');
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {manageUserReducer} from 'usersReducer';
import {manageTodosReducer, setCompletedReducer} from 'todosReducer';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    auth: manageUserReducer,
    todos: manageTodosReducer,
    completed: setCompletedReducer,
  });

  var store = redux.createStore(reducer, initialState, applyMiddleware(thunk), redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
