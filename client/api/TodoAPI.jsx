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
  getSingleTodo(){};
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
  updateTodo(){};
}
export default TodoAPI;
