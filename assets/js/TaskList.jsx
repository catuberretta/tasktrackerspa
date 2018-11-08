import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';

function TasksList(props) {
    let prods = _.map(props.tasks, (p) => <Task key={p.id} task={p} />);
    return <div className="row">
      {prods}
    </div>;
  }

  function Task(props) {
    let {task} = props;
    return <div className="card col-4">
      <div className="card-body">
        <h2 className="card-title">{task.name}</h2>
        <p className="card-text">{task.desc} <br/>
        price: {tasks.price}</p>
      </div>
    </div>;
  }

  function state2props(state) {
    console.log("render TaskList", state);
    return {
      tasks: state.tasks,
      users: state.users,
      sessions: state.sessions
    };
  }
  
  export default connect(state2props)(TasksList);