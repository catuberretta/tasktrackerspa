defmodule TaskTrackerSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string, null: false
      add :desc, :text, null: false
      add :timeSpent, :integer
      add :assignedTo, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:tasks, [:assignedTo], unique: true)
  end
end
