import axios from 'axios';
import {hashHistory} from 'react-router';
class UserAPI {
  getUsers(){
    console.log('get users');
  }
  getLoggedUser(){
    return axios.get('/users/me', {headers: {'x-auth': sessionStorage.getItem('x-auth')}})
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }
  checkUserAuth(){
    return this.getLoggedUser().then((response) => {
      if(response.status === 401){
        hashHistory.push('/register')
        return false;
      }
      return response;
    }).catch((e) => {
      console.log('auth function error', e);
      return false;
    });
  }

  registerUser(email, password){
    return axios.post('/user/register', {
      email: email,
      password: password
    })
      .then(function (response) {
        if(response.data.userData){
          sessionStorage.setItem('x-auth', response.data.token);
          hashHistory.push('/users')
        }
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  loginUser(email, password){
    return axios.post('/user/login', {
      email: email,
      password: password
    })
      .then(function (response) {
        if(response.data.user){
          sessionStorage.setItem('x-auth', response.data.token);
          hashHistory.push('/users')
        }
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  logOutUser(){
    return axios.delete('/user/logout', {headers: {'x-auth': sessionStorage.getItem('x-auth')}})
      .then(function (response) {
        sessionStorage.removeItem('x-auth');
        hashHistory.push('/register')
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default UserAPI
