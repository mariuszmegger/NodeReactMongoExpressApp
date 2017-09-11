import UserAPI from 'UserAPI';
import TodoAPI from 'TodoAPI';
var {hashHistory} = require('react-router');

import {GET_LOGGEDIN_USER} from '../actions/types';
import {LOGIN_USER} from '../actions/types';
import {LOGOUT_USER} from '../actions/types';
import {REGISTER_USER} from '../actions/types';

import {GET_TODOS} from '../actions/types';
import {SET_COMPLETED} from '../actions/types';
import {GET_SINGLE_TODO} from '../actions/types';
import {ADD_TODO} from '../actions/types';
import {EDIT_TODO} from '../actions/types';
import {DELETE_TODO} from '../actions/types';

//Users actions

export var registerUser = (email, password) => async dispatch =>{
  const userAPI = new UserAPI()
  const res = await userAPI.registerUser(email, password);
  dispatch({type:REGISTER_USER, payload: res.data})
};

export var loginUser = (email, password) => async dispatch =>{
  const userAPI = new UserAPI()
  const res = await userAPI.loginUser(email, password);
  dispatch({type:LOGIN_USER, payload: res.data})
};

export var logoutUser = () => async dispatch =>{
  const userAPI = new UserAPI()
  const res = await userAPI.logoutUser();
  dispatch({type:LOGOUT_USER, payload: res.data})
};

export var getLoggedinUser = (completed) => async dispatch =>{
  const userAPI = new UserAPI()
  const res = await userAPI.checkUserAuth();
  dispatch({type:GET_LOGGEDIN_USER, payload: res.data})
};

//Todos Actions

export var getTodos = (completed) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.getTodos(completed);
  dispatch({type:GET_TODOS, payload: res.data})
};

export var setCompleted = (completed) => dispatch =>{
  dispatch({type:SET_COMPLETED, payload: completed})
};

export var getSingleTodo = (id) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.getSingleTodo(id);
  dispatch({type:GET_SINGLE_TODO, payload: res.data})
};

export var addTodo = (text) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.addTodo(text);
  if(res){
    hashHistory.push('/todos');
  }
};

export var editTodo = (todo) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.updateTodo(todo);
  console.log(res);
};

export var deleteTodo = (id) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.deleteTodo(id);
  console.log(res);
  if(res){
    console.log('vvv');
      $('#'+id).parent('tr').hide(400);
  }

};
