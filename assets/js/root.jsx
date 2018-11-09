import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';

import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import api from './api';
import store from './store';
import TasksList from './TaskList';

export default function root_init(node) {
  let prods = window.tasks;
  let ConnectedRoot = connect(state2props)(Root)

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRoot />
    </Provider>, node);
}


class Root extends React.Component {
  constructor(props) {
    super(props);

    api.fetch_tasks();
    api.fetch_users();
  }


  render() {

  let {session, users} = this.props;

   let currentUser = (u) => {
     return u.id == session.user_id ? u.email : null;
   }
    
    if (this.props.session) {
      return <div>
      <h1> Welcome back, friend.</h1>
      <p>{users.map(currentUser)}</p>
      <TasksList />
      <button onClick={(e) => { e.preventDefault(); api.endSession()}} className="btn">Logout</button>
    </div>;
    }
    else {
      return <StarterPage root={this}/>
    }
   
  }
}

function StarterPage(props) {
  let {root} = props;
  return <div>
  <div className="container">
    <h1>Task Tracker</h1>
    <p> Yes. Here we are. Many have come and gone, many tasks have been registered and done, many have not. 
        But still...something was missing. Perhaps with Task Tracker 2.0, you found what you were missing from Task Tracker 2.0.
        So you may ask, what can this Task Tracker do that the others couldn't? Well, frankly, nothing. 
        But! Be aware, this is a Single Page Application– something Task Tracker 1.0 and 2.0 could never even dream of being. 
        Nevertheless, thank you for coming back. I hope you enjoy your stay.
      </p>
      <form>
    <div className="form-group">
    <input type="email" className="form-control" id="userEmail" type="email" placeholder="email" />
    <input type="password" className="form-control" id="userPassword" type="password" placeholder="password" />
    <button onClick={(e) => { e.preventDefault(); api.create_user()}} className="btn btn-primary">Register</button>
    <button onClick={(e) => { e.preventDefault(); api.create_session()}} className="btn btn-primary">Login</button>
    </div>
    </form> 
      </div>
    </div>;
  }



  function state2props(state) {
    return {
      users: state.users,
      session: state.session
    };
  }
  

