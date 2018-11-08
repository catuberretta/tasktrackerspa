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
  let ConnectedRoot = connect((state) => state)(Root)

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRoot />
    </Provider>, node);
}


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };

    api.fetch_tasks();
    //api.fetch_users();
  }


  render() {
    if (this.props.session) {
      return <div>
      <h1> Welcome back, friend.</h1>
      <p> Yes. Here we are. Many have come and go, many tasks have been registered and done. 
        You seek control over your life? And perhaps with Task Tracker 2, you found what you needed.
        You may ask, what can this Task Tracker do that the others couldn't? Well, frankly, nothing. 
        But! Be aware, this is a Single Page Application-- something Task Tracker 1 and 2 could NEVER EVEN DREAM of being. 
        Ah, there I go again. Nevertheless, thank you for coming back. I hope you enjoy your stay.
      </p>
      <TasksList tasks={this.state.tasks} />
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
  <div>
    <h1>Task Tracker</h1>
    <h1>Welcome!</h1>
  </div>
  <form>
    <div className="form-group">
    <input type="email" className="form-control" id="userEmail" type="email" placeholder="email" />
    <input type="password" className="form-control" id="userPassword" type="password" placeholder="password" />
    <button onClick={(e) => { e.preventDefault(); api.create_user()}} className="btn btn-primary">Register</button>
    <button onClick={(e) => { e.preventDefault(); api.create_session()}} className="btn btn-primary">Login</button>
    </div>
  </form>
</div>;
  }


