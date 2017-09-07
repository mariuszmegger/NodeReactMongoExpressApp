var uuid = require('node-uuid');
var moment = require('moment');
import {GET_LOGGEDIN_USER} from '../actions/types';


export var manageUserReducer = (state = null, action) => {
    console.log(action);
  switch (action.type) {
    case 'REGISTER_USER':
      return action.registerUser;
    case 'LOGIN_USER':
      return action.loginUser;
    case 'LOGOUT_USER':
      return action.logoutUser;
    case GET_LOGGEDIN_USER:
      return action.payload || false;
    default:
      return state;
  };
};
