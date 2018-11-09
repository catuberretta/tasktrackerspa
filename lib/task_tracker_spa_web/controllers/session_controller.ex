
defmodule TaskTrackerSpaWeb.SessionController do
    use TaskTrackerSpaWeb, :controller


    alias TaskTrackerSpa.Users.User

    def create(conn, %{"email" => email, "password" => password}) do
      result = TaskTrackerSpa.Users.get_and_auth_user(email, password)
      IO.inspect(result)
      with %User{} = user <- result do
        resp = %{
          data: %{
            token: Phoenix.Token.sign(TaskTrackerSpaWeb.Endpoint, "user_id", user.id),
            user_id: user.id,
          }
        }
        conn
        |> put_resp_header("content-type", "application/json; charset=utf-8")
        |> send_resp(:created, Jason.encode!(resp))
      end
    end
  end