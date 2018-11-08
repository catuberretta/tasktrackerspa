
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



}



export default new TheServer();
