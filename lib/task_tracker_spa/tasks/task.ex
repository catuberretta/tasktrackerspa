defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string
    field :name, :string
    field :timeSpent, :integer
    field :completed, :boolean
    belongs_to :user, TaskTrackerSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :desc, :timeSpent, :completed, :user_id])
    |> validate_required([:name, :desc, :timeSpent])
  end
end
