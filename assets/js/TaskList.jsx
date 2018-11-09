import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import api from './api';

class TasksList extends React.Component {
    render() {
    let prods = _.map(this.props.tasks, (p) => <Task key={p.id} task={p} />);
    return <div><div className="row">
            <p>
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="newTaskCollapse" aria-expanded="false" aria-controls="newTaskCollapse">
            Create new task
          </button>
        </p>
        <div class="collapse" id="newTaskCollapse">
          <div class="card card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </div>

        </div>
        <div className="row">
      {prods}
    </div>
    </div>;
    }
  }

  class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.task.name,
            desc: this.props.task.desc,
            timeSpent: this.props.task.timeSpent,
            completed: this.props.task.completed,
            user_id: this.props.user_id
        }
    }

    render() {

    let editTaskTitle = (ev) => {
        console.log(ev.target.value)
        let state1 = _.assign({}, this.state, {name: ev.target.value})
        this.setState(state1);
    }    

    let {task, users, session} = this.props;
    return <div className="card col-4">
      <div className="card-body">
        <input type="text" className="card-title" value={this.state.name} onChange={editTaskTitle}/>
        <input type="text" className="card-text" value={this.state.desc}/>
        <input type="number" className="form-control" value={this.state.timeSpent}/>
        <input type="checkbox" value={this.state.completed}/>
        <button onClick={() => api.edit_task(task.id, {name: this.state.name, 
            desc: this.state.desc, 
            timeSpent: this.state.timeSpent,
            completed: this.state.completed,
            user_id: this.state.user_id})} 
            className="btn btn-primary">Save Edited Task</button>
        <button onClick={() => api.delete_task(task.id)} className="btn btn-warning">Delete Task</button>
      </div>
    </div>;

    }   
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