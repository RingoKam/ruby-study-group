# Ruby on Rail (RoR)

Ruby on rails is a server side web framework. It follows the MVC patterns and provide devs a bunch of tools to get an app up and running quickly.

## Commands

- `rails new app_name` create a RoR application
- `bin/rails server` launch local puma server
- `bin/rails generate` use rail to generate/scaffold
  ex: `bin/rails generate migration activity` create a migration for the db
  ex: `bin/rails generate model Activity` create an activity active record model in the app/model
- `bin/rails destroy` opposite of generate, if we no longer need the scaffold code from the generate command, we can destroy it.
  base on the above example: `bin/rails destroy migration activity` and `bin/rails destroy model Activity` will clean up the files generated
- `bin/rails console` let us interact with ruby on rails in the command line
- `bin/rails runner file.rb` run selected file or script in rails
- `bin/rails db:migration` run migration
- `bin/rails db:rollback` rollback last migration
- `bin/rails db:seed` run seed code in db/seeds
- `bin/rails db:reset` delete db and recreate it and run all the migrations (run seed as well)

## Rake

Rake is the task runner for ruby on rails app. Rails by default provide a list of predefined rake task, we can check out the list of available rake task with the command `bin/rake --tasks`.

We can create our own rake task by adding a file with .rake extension in `/lib/tasks`.

## Directory Structure

- `app`
  - `models` folder for the activerecord data models
  - `views` display template, would be different file type base on the template engine of choice, we are using erb.
    - `layouts` template file that wraps around view
  - `controllers` controller class that handle web request
  - `assets` static asset for your webpage (image, css, js, etc)
  - `helpers` helper classes goes here~~
  - `jobs` holds jobs for rails active job system, allow you to create a job for background workers (sidekiq/resque...)
  - `mailers` hold classes for action mailer (send email)
  - `policies` holds our pundit policy
  - `channels` classes that enable real time functionality with websocket (using actioncable)
  - `javascript` hold javascript source file (un min), in our case we have all our FE code there. (soon to be changed?)
  - `errors` holds our list of predefined errors
  - `queries` folder that holds different kind of querying logic, ex: Elasticsearch
  - `presenters` methods that help with modifiy the model before displaying it in the view.
  - `serializers` bunch of serializer class used serialize data into JSONAPI format
  - `frameworks` holds our custom build framework/library? can probably dive deeper here

## Routing

How does rails handle routing?
Driven by the configs in `configs/routes.rb`. Keep in mind the order matters!
d

## Rack

Middleware

## Spring Preloader

## Puma

## Pundit

| Authorization

## sprockets

## Action Cable

## Action Mailers
