var uuid = require('node-uuid');
var moment = require('moment');


export var manageTodosReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return action.getTodos;
    case 'ADD_TODO':
      return action.addTodo;
    case 'EDIT_TODO':
      return action.editTodo;
    case 'DELETE_TODO':
      return action.deleteTodo;
    default:
      return state;
  };
};

let getTodos = () =>{
  return{
    type:'GET_TODOS',
  }
}

let addTodos = () =>{
  return{
    type:'ADD_TODO',
  }
}

let editTodo = (id, text, completed) =>{
  return{
    type:'EDIT_TODO',
  }
}

let deleteTodo = () =>{
  return{
    type:'DELETE_TODO',
  }
}
