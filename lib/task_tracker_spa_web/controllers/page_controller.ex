defmodule TaskTrackerSpaWeb.PageController do
  use TaskTrackerSpaWeb, :controller


  def index(conn, _params) do
    tasks = TaskTrackerSpa.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :name, :desc, :user_id])))
    render conn, "index.html", tasks: tasks
  end
end
