import UserAPI from 'UserAPI';
import {GET_LOGGEDIN_USER} from './types';
//Users actions

export var registerUser = (email,password) => {
  return {
    type: 'REGISTER_USER',
    email,
    password
  };
};

export var loginUser = (email,password) => {
  return {
    type: 'LOGIN_USER',
    email,
    password
  };
};

export var logoutUser = (completed) => {

  return {
    type: 'LOGOUT_USER',
  };
};

export var getLoggedinUser = (completed) => async dispatch =>{
  const userAPI = new UserAPI()
  const res = await userAPI.checkUserAuth();
  console.log(res.data);
  dispatch({type:GET_LOGGEDIN_USER, payload: res.data})
};

//Todos Actions

export var getTodos = (completed) => {
  return {
    type: 'GET_TODOS',
    completed,
  };
};

export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
  };
};

export var editTodo = (id, text,completed) => {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    completed
  };
};

export var deleteTodo = (id) => {
  return {
    type: 'LOGOUT_USER',
    id
  };
};
