# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskTrackerSpa.Repo
alias TaskTrackerSpa.Users.User
alias TaskTrackerSpa.Tasks.Task

pwhash = Comeonin.Argon2.hashpwsalt("pass1");
pwhash2 = Comeonin.Argon2.hashpwsalt("pass1");
pwhash3 = Comeonin.Argon2.hashpwsalt("pass");


Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash, admin: false})
Repo.insert!(%User{email: "bob@example.com", password_hash: pwhash2, admin: false})
Repo.insert!(%User{email: "catu@hotmail.com", password_hash: pwhash3, admin: false})

Repo.insert!(%Task{name: "Have fun!", desc: "Don't cry 5 times over this", completed: false, timeSpent: 60, user_id: 1})
Repo.insert!(%Task{name: "Eat popeyes", desc: "Make sure you remember a napkin!", completed: false, timeSpent: 10000, user_id: 2})
