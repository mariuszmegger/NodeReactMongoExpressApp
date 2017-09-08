import UserAPI from 'UserAPI';
import TodoAPI from 'TodoAPI';

import {GET_LOGGEDIN_USER} from '../actions/types';
import {LOGIN_USER} from '../actions/types';
import {LOGOUT_USER} from '../actions/types';
import {REGISTER_USER} from '../actions/types';

import {GET_TODOS} from '../actions/types';
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
  console.log(res);
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
  console.log(res.data);
  dispatch({type:GET_LOGGEDIN_USER, payload: res.data})
};

//Todos Actions

export var getTodos = (completed) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.getTodos(completed);
  dispatch({type:GET_TODOS, payload: res.data})
};

export var getSingleTodo = (id) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.getSingleTodo(id);
  console.log(res);
  dispatch({type:GET_SINGLE_TODO, payload: res.data})
};

export var addTodo = (text) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.addTodo(text);
  console.log(res);
  dispatch({type:ADD_TODO, payload: res.data})
};

export var editTodo = (todo) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.updateTodo(todo);
  console.log(res);
  dispatch({type:EDIT_TODO, payload: res.data})
};

export var deleteTodo = (id) => async dispatch =>{
  const todoAPI = new TodoAPI()
  const res = await todoAPI.deleteTodo(id);
  console.log(res);
  dispatch({type:DELETE_TODO, payload: res.data})
};
