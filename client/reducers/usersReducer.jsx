import {GET_LOGGEDIN_USER} from '../actions/types';
import {LOGIN_USER} from '../actions/types';
import {LOGOUT_USER} from '../actions/types';
import {REGISTER_USER} from '../actions/types';


export var manageUserReducer = (state = null, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload || false;
    case LOGIN_USER:
      return action.payload || false;
    case LOGOUT_USER:
      return action.payload || false;
    case GET_LOGGEDIN_USER:
      return action.payload || false;
    default:
      return state;
  };
};
