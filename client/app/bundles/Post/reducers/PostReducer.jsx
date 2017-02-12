import { combineReducers } from 'redux';
import { POST_NAME_UPDATE } from '../constants/PostConstants';

const name = (state = '', action) => {
  switch (action.type) {
    case POST_NAME_UPDATE:
      return action.text;
    default:
      return state;
  }
};

const PostReducer = combineReducers({ name });

export default PostReducer;
