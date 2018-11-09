import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import api from './api';

class TasksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: {name:"", desc:"", completed: false, timeSpent:0, user_id:1}
        }
    }

    render() {
    let {task, users, session} = this.props;
    let alltasks = _.map(this.props.tasks, (p) => <Task key={p.id} task={p} users={users} session={session}/>);

    let new_taskName = (ev) => {
        let task = this.state.newTask;
        task.name = ev.target.value;
        let state1 = _.assign({}, this.state, { newTask: task });
        this.setState(state1);
    }    

    let new_taskDesc = (ev) => {
        let task = this.state.newTask;
        task.desc = ev.target.value;
        let state1 = _.assign({}, this.state, { newTask: task });
        this.setState(state1);
    }   

    let new_taskTime = (ev) => {
        let task = this.state.newTask;
        task.timeSpent = ev.target.value;
        let state1 = _.assign({}, this.state, { newTask: task });
        this.setState(state1);
    }   
    
    let new_taskCompleted = (ev) => {
        let task = this.state.newTask;
        task.Completed = ev.target.value;
        let state1 = _.assign({}, this.state, { newTask: task });
        this.setState(state1);
    } 

    let createTask = () => {
        let state1 = _.assign({}, this.state.newTask, {name:"", description:"", completed: false, timespent:0, user_id:1});
        this.setState({newTask: state1});
        api.create_task(this.state.newTask, session.token)
    }

    let new_assignUser = (ev) => {
        let task = this.state.newTask;
        task.user_id = (parseInt(ev.target.value));
        let state1 = _.assign({}, this.state, { newTask: task });
        this.setState(state1);
    }

    let usersList = (user) => {
        return user.id == session.user_id ? <option key={user.id} value={user.id} defaultValue>{user.email}</option> : <option key={user.id} value={user.id}>{user.email}</option>;
    };
    
    return <div>
    <div className="card">
    <div className="card-header">New Task</div>
    <div className="card-body">
        <form>
            <div className="form-group">
                <label htmlFor="name">Title</label>
                <input type="text" className="form-control" value={this.state.newTask.name} onChange={new_taskName}/>
            </div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input type="text" className="form-control" value={this.state.newTask.desc} onChange={new_taskDesc}/>
            </div>
            <div className="form-group">
                <label htmlFor="time">Time Spent:</label>
                <input type="number" step={15} className="form-control" value={this.state.newTask.timeSpent} onChange={new_taskTime}/>
            </div>
            <div className="form-group">
                <label htmlFor="completed">Completed?</label>
                <input type="checkbox" value={this.state.newTask.Completed} onChange={new_taskCompleted}/>
            </div>
            <div className="form-group">
                <label htmlFor="newTaskAssignTo">Assigned to:</label>
                <select className="form-control" id="newTaskAssignTo" value={this.state.newTask.user_id} onChange={new_assignUser}>{users.map(usersList)}</select>
            </div>
        </form>
        <button className="btn btn-info" onClick={createTask}>Create Task</button>
        </div>
    </div>

    <div className="row">
        {alltasks}
    </div>

    </div>
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
    let {task, users, session} = this.props;

    let editTaskTitle = (ev) => {
        let state1 = _.assign({}, this.state, {name: ev.target.value})
        this.setState(state1);
    }    

    let editTaskDesc = (ev) => {
        let state1 = _.assign({}, this.state, {desc: ev.target.value})
        this.setState(state1);
    }   

    let editTaskTime = (ev) => {
        let state1 = _.assign({}, this.state, {timeSpent: ev.target.value})
        this.setState(state1);
    }   
    
    let editTaskCompleted = (ev) => {
        let state1 = _.assign({}, this.state, {completed: ev.target.value})
        this.setState(state1);
    } 

    let changeAssignedUser = (ev) => {
        let state1 = _.assign({}, this.state, { user_id: ev.target.value });
        this.setState(state1);
    };  

    let allUsers = (user) => {
        return user.id == session.user_id ? <option key={user.id} value={user.id} defaultValue>{user.email}</option> : <option key={user.id} value={user.id}>{user.email}</option>;
    };

    let newTimeSpent = session.user_id == task.user_id ?
    <div className="form-group">
    <label htmlFor="time">Time Spent:</label>
    <input type="number" step="15" className="form-control" value={this.state.timeSpent} onChange={editTaskTime}/>
    </div>
    : <div className="form-group">Time spent: {task.timeSpent}</div>;

    return <div className="card col-4">
                <div className="card-body">
                    <div className="form-group">
                        <input type="text" className="card-title" value={this.state.name} onChange={editTaskTitle}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.desc} onChange={editTaskDesc}/>
                    </div>
                    {newTimeSpent}
                    <div className="form-group"> 
                        <label className="form-check-label" htmlFor="completed">Completed? </label>
                        <input type="checkbox" value={this.state.completed} onChange={editTaskCompleted}/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="assign">Assigned User: </label>
                        <select className="form-control" id="assign" defaultValue={task.user_id} onChange={changeAssignedUser}>
                        {users.map(allUsers)}
                        </select>
                    </div>
                    <button onClick={() => api.edit_task(task.id, {name: this.state.name, 
                        desc: this.state.desc, 
                        timeSpent: this.state.timeSpent,
                        completed: this.state.completed,
                        user_id: this.state.user_id}, session.token)} 
                        className="btn btn-primary">Save Edited Task</button>
                    <button onClick={() => api.delete_task(task.id, session.token)} className="btn btn-warning">Delete Task</button>
                </div>
            </div>

    }   
  }

  function state2props(state) {
    return {
      tasks: state.tasks,
      users: state.users,
      session: state.session
    };
  }
  
  export default connect(state2props)(TasksList);