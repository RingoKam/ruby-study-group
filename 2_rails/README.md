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
A lot of things may not apply to our current app as we are using grape and that has its own routing convention! Below conventions are for Ruby on Rails App!

With a plain RoR application it generally follows the `http://(host)/(controller)/(action)` convention.

Rails routing config can be found in `configs/routes.rb`. To Add a route, we can follow this following convention:
`get/post/delete/put/update` `controller/action`, ex: `get 'todo/action1'`

We can list our application route in a table by running `rails routes`.

- `Prefix`: this is use as a prefix for `_path` in ruby templating engine. For example if we want to access get the path for /controller/action, it would be controller_action_path in the template engine, ex below with erb
```erb
<div>path to action1 in todo_controller: <%= todo_action1_path %></div>
```
- `Verb` Our HTTP Verb Get/Post/Delete/Update/Put...
- `URI Pattern` our URI address
- `Controller#Action` our controller class and the method responsible for handling that route

> Keep in mind the order of the route matters! High routes have higher precedence over lower route

### Route Config options
- `to:` if want to specify a custom route that is not part of the controller/action convention, we can use `to:`, below example will map the route 'todo/:id/update' to todo_controller update method
```rb
get 'todo/:id/update', to: 'todo#update'
```
- `:resources` shorthand to create a list of routes based on rails convention. if we have below in our route config
```rb
resources :students 
```
it will create the following routes
```
      Prefix Verb   URI Pattern                  Controller#Action
    students GET    /students(.:format)          students#index
             POST   /students(.:format)          students#create
 new_student GET    /students/new(.:format)      students#new
edit_student GET    /students/:id/edit(.:format) students#edit
     student GET    /students/:id(.:format)      students#show
             PATCH  /students/:id(.:format)      students#update
             PUT    /students/:id(.:format)      students#update
             DELETE /students/:id(.:format)      students#destroy
```
> the .:format represent it will have a `[:format]` in the params
- `:as` create custom prefix

## Rack
Rack is a ruby object that can enable us to create our own middleware! It basically wraps our requests and repsonses
A Rack application is a Ruby object (not a class) that responds to call. It takes exactly one argument, the environment and returns an Array of exactly three values: The status, the headers, and the body.

Example:
```rb
class MyMiddleware
  # @params access our rails application
  def initialize(app)
    @app = app
  end

  # @params  request environment
  def call env
      # call into the next middleware and wait for the response
      @status, @headers, @response = @app.call(env)
  end
  
end
```

### Mounting
Couple of ways we can add our middleware to our app.
1. `rake middleware MyMiddleware` will add to app middleware stack in runtime
2. Add it to `config/application.rb`. 
```rb
module MyRailsApplication
  class Application < Rails::Application
    # other stuff...
    config.middleware.use "MyMiddleware"
  end
end
```
We can pass additional parameter to the middleware by adding it in the constructor param
```rb
module MyRailsApplication
  class Application < Rails::Application
    # other stuff...
    config.middleware.use "MyMiddleware", 'ringo'
  end
end

class MyMiddleware
  def initialize(app, name)
    @app = app
    @name = name
  end

  def call env
    Rails.logger.send("hello " + @name)
    @status, @headers, @response = @app.call(env)
  end
  
end
```
3. We can also set middleaware in any of the file in `config/environment` folder
```
# config/environment/development.rb
module MyRailsApplication
  class Application < Rails::Application
    *snip*

    config.middleware.use MyMiddleware

    *snip*
  end
end
```
> `bin/rails middleware` lists Rack middleware stack enabled for the app.

## Spring Preloader
Rails application preloader. It keep our app running in the background so we dont need to do a full reboot everytime we make a change. 

For example we can potentially speed up our test with 
`spring rspec` 

CAUTION! spring can cause problem when you changing/adding files. If you see something weird in your code/test, try 
`spring stop` and boot it up again. 

## Puma

## Pundit
Authorization
