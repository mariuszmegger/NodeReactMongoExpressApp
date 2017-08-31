import axios from 'axios';

class TodoAPI {
  constructor(){
  }
  getTodos(){
     return axios.get('/todos', {headers: {'x-auth': sessionStorage.getItem('x-auth')}})
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getSingleTodo(id){
    return axios.get(`/todos/${id}`, {headers: {'x-auth': sessionStorage.getItem('x-auth')}})
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  deleteTodo(){};
  addTodo(todo){
    return axios.post('/todos', {text:todo.text}, {headers: {'x-auth': sessionStorage.getItem('x-auth')}})
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  updateTodo(todo){
    return axios.patch(`/todos/update/${todo._id}`, {text:todo.text, completed:todo.completed}, {headers: {'x-auth': sessionStorage.getItem('x-auth')}})
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
export default TodoAPI;
