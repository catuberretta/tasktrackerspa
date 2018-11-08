import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function root_init(node) {
  let prods = window.tasks;
  ReactDOM.render(<Root tasks={prods} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };

    //this.fetch_tasks();
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      },
    });
  }

  render() {
    return <div>
      <Header />
      <TasksList tasks={this.state.tasks} />
    </div>;
  }
}

function Header(_props) {
  return <div className="row my-2">
    <div className="col-6">
      <h1>Husky Shop</h1>
    </div>
    <div className="col-6">
      <div className="form-inline my-2">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </div>;
}

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