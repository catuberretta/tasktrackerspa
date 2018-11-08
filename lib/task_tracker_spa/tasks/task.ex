defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string
    field :name, :string
    field :timeSpent, :integer
    field :assignedTo, :id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :desc, :timeSpent])
    |> validate_required([:name, :desc, :timeSpent])
  end
end
