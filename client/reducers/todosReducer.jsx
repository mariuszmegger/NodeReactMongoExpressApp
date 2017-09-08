import {GET_TODOS} from '../actions/types';
import {GET_SINGLE_TODO} from '../actions/types';
import {ADD_TODO} from '../actions/types';
import {EDIT_TODO} from '../actions/types';
import {DELETE_TODO} from '../actions/types';


export var manageTodosReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TODOS:
      return action.payload.todos || false;
    case GET_SINGLE_TODO:
      return action.payload || false;
    case ADD_TODO:
      return action.payload || false;
    case EDIT_TODO:
      return action.payload || false;
    case DELETE_TODO:
      return action.payload || false;
    default:
      return state;
  };
};
