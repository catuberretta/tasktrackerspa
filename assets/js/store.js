import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function session(state0 = null, action) {
    switch (action.type) {
    case 'NEW_SESSION':
      return action.data;
    case 'LOGOUT_OF_SESSION':
      return state0;
    default:
      return state0;
    }
  }

  function tasks(state0 = [], action) {
    switch (action.type) {
    case 'TASKS_LIST':
      return action.data;
    default:
      return state0;
    }
  }

  function users(state0 = [], action) {
    switch (action.type) {
    case 'USER_LIST':
      return action.data;
    case 'NEW_USER':
        return state0;
    case 'DELETE_USER':
        return state0;
    default:
      return state0;
    }
  }

  


function root_reducer(state0, action) {
    console.log("reducer", state0, action);
  
    let reducer = combineReducers({tasks, session});
    let state1 = reducer(state0, action);
  
    console.log("state1", state1);
    return state1;
  }
  
  let store = createStore(root_reducer);
  export default store;