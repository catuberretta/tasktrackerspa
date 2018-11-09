
import store from './store';


class TheServer {
    fetch_path(path, callback) {
      $.ajax(path, {
        method: "get",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: callback,
      });
    }

    // Tasks Database Calls
fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
            type: 'TASKS_LIST',
            data: resp.data,
          });
      },
    });
  }

  delete_task(id, token) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({token: token}),
      success: (resp) => {
        this.fetch_tasks()
      },
    });
  }

  create_task(newTask, token) {
    $.ajax("/api/v1/tasks/", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task: newTask, token: token}),
      success: (resp) => {
        this.fetch_tasks()
      },
    });
  }

    edit_task(id, newTask, token) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({id: id, task: newTask, token: token}),
      success: (resp) => {
        this.fetch_tasks()
      },
    });
  }

      // User Database Calls
  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
    }

  create_user() {
    let email = $('#userEmail').val()
    let password = $('#userPassword').val()

    $.ajax("/api/v1/users", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({user: {email, password}}),
        success: (resp) => {
          store.dispatch({
            type: 'NEW_USER',
            data: resp.data,
         });
         this.create_session()
        }
      });
  }

  create_session() {
    let email = $('#userEmail').val()
    let password = $('#userPassword').val()

    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    });
  }

  endSession() {
    let action = {
      type: "LOGOUT_OF_SESSION",
      data: null
    }
    store.dispatch(action);
}




}



export default new TheServer();
