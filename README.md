# TaskTrackerSpa

The Task Tracker is an web application meant for multi-user task tracking.

In my Task Tracker, a user can register with just a name so that way they can return and log in back to their account. Once they have an account, they can create, edit and delete tasks. These tasks can be assigned by them to themselves or other people. To track the amount spent, a user can put in the time in 15 minute increments and when the task is completed, they can mark it as so.

In this version of the Task Tracker (version 3!), we are now dealing with a Single Page Application. This means that multiple pages are simulated using react-router and AJAX requests to a JSON API. The UI state is handlded using Redux. This version now contains a login functionality with an email as a username and best of all, passwords! These passwords are stored hashed in the database so that identity theft cannot occur. Woo security!

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
