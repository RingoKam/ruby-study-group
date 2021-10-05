# Ruby Syntax

Ruby is a dynamic language with a JIT Compiler

To get started, install ruby. You can run repl ruby w/ `irb`

You can also run ruby files with `ruby 'FileName.rb'`

## Working with ruby cli

`puts` print out the value in the console (similar to console.log)
`gets` capture user input

we can access command line arguments from a special array `ARGV`. If we run `ruby my_script.rb these are my argv`, the argv variable when my_script runs will be ["these", "are", "my", "argv"]

---

## Fun facts and Convention:

- Pascal case for classes and modules, this is actually enforce by the language `MyClass`
- Snake case for files, variables, methods `my_variable`
- Upper case for constant
- `()` is optional for function/method

```ruby
puts 'this is sparta!!!'
# is the same with ()
puts('this is sparta!!!')

# to not invoke the method, but store it in a variable
my_puts = method(:puts)
my_puts.call 'this is sparta!!!'
```

- Every statement returns a value, in a function with no `return` is specified, the last statement result gets return
- methods with `!` at the end are called bang method. They usually have side effects that change the object. (keep in mind this is a convention and not strictly enforce by the language)
- rails and activerecord use `!` for methods that will fail silently without
  ex:

```ruby
# chomp remove \n from the end of a string

my_string_variable = "hello world\n"
result = my_string_variable.chomp

put result # return => "hello world"
put my_string_variable # return => "hello world\n"

result = my_string_variable.chomp!
put result # return => "hello world"
put my_string_variable # return => "hello world"
```

- question methods are method that end with `?`. They return true and false

---

## Variables

- local: local variable defined in a method. Only can be access within method

```ruby
testing = 1

def my_function()
    testing = 2
end

puts my_function # => 2

puts testing # => 1
```

- Instance: available in the object `@`

```ruby
@testing = 1

def my_function()
    @testing = 2
end

puts my_function # 2

puts @testing # 2
```

- Class: available inside the class `@@`

- Global: globally accessible, `$`

## String

single quote if we want to take the string as is. (very small performance gain)
double qoute if we want to use string intepolation.

```ruby
# string intepolation
my_name = "ringo"
puts my_name
puts "#{name} world"

# multi line string
puts %{
this is line1
this is line2
this is line3
}
```

## Array

```ruby
my_array = []
# or
my_array = Array.new

# we can create an array with items in mulitple ways, below all does the same thing
my_array = ["0","1","2","3"] # most common
my_array = Array.new (4) { |i| i.to_s }
my_array = Array.[]("0","1","2","3")
my_array = Array["0","1","2","3"]
my_array = %w[0 1 2 3 3] # most common

# access item within array
first_item = my_array[0]
first_item = my_array.first
first_item = my_array.at 0

# add to an array
my_array.push(4)  #=> [0, 1, 2, 3, 4]
my_array << 5     #=> [0, 1, 2, 3, 4, 5]
my_array.insert(5, 6) #=> [0, 1, 2, 3, 4, 5, 6]

# add to beginning of an array
my_array.unshift(-1) [0, 1, 2, 3, 4, 5, 6]

# remove from an array
my_array.delete_at 5 # delete index 5, returns the item deleted
my_array.delete "2" # delete value that match up to 2

my_array.pop # remove from last
```

## Hash

Our good ole dictionary, a collection of key value pairs

```ruby
# declarea hash
student_ages = {
    :Jack => 10,
    :Jill => 12,
    :Bob => 14
}

#alternative syntax
student_ages = {
    Jack: 10,
    Jill: 12,
    Bob: 14
}


# retrieve a value from hash
puts student_ages[:Jack]

#update
student_ages[:Jill] = 16
puts student_ages[:Jill]

#We can also use string as key instead of symbol
#loop keys
restaurant_menu = { "Ramen" => 3, "Dal Makhani" => 4, "Coffee" => 2 }
# write the each loop here.
restaurant_menu.each do | key, value |
  restaurant_menu[key] *= 1.1
end

#get keys
restaurant_menu.keys

#get values
restaurant_menu.values

# We can define a default value when key is not found
usually_brown = Hash.new("brown")
pretending_to_be_there = usually_brown[:aaa]
puts "Pretending to be there:"
puts pretending_to_be_there # <= print brown
```

## Blocks

In ruby you can define a block 2 in ways: multi line and single line

```ruby
# multi line
do | arg |
	# do something
end

# single line
{ | arg | # do something  }
```

Keep in mind both ways above are only convention and not enforced by the language

You can also create a named block. it is separate into 2 part, the function that yield and the named associated block that has the same name as the function.

```ruby
# we can define a funcition with a yield
def my_block_func
  puts "running my_block_func"
  yield
  puts "done running"
end

# invoke the function with a block
my_block_func {
  puts "i am a block"
}
# => above will invoke the my_block_func and log
# => "running my_block_func"
# => "i am a block"
# => "done running"

#  we can also write, which would produce the same result
my_block_func do
    puts "this is my favorite block"
end
```

> If a method is defined with yield statement, it needs to be invoke with a block! otherwise it will throw an localJumpError

we can also add an argument to our block

```ruby
@test = 0

def my_block_func
    @test += 1
    yield @test
end

my_block_func { | arg | puts "this is my favorite block #{arg}" }
# => this is my favorite block 1

my_block_func do | arg |
    puts "this is my favorite block #{arg}"
end
# => this is my favorite block 2
```

Ruby has a default named block `BEGIN` and `END`, the content within will get invoke as when the file execution BEGIN and END

```ruby
BEGIN {
  puts "script file start exec"
}

END {
  puts "script file finish exec"
}
```

and use a block as an argument!

- A method can only take in 1 block as an argument.
- The block paramemter needs to the last argument.
- Its a convention to change add `&` before the block parameter variable name (optional)

```ruby
def nem(msg, &block) do
    block.call(msg)
    block2.call(msg)
end

nem("test") { |msg| puts msg } # => print out test
nem("hello world") { |msg| puts msg } # => print out hello world
```

## Loops

```ruby
# our good ole while loop
condition = true
while condition do
  # set condition to false eventually
end

# do while loop, will execute at least once
begin
  # set condition to false eventually
end while condition

# we can filp above with until, which will keep looping if condition is FALSE
condition = false
until condition do
  # set condition to true eventually
end

# do while loop, will execute at least once
begin
  # set condition to true eventually
end until condition

# equivalent way of looping
my_array = [0,1,2,3,4,5]
for i in my_array
  puts i
end

my_array.each do |i|
  puts i
end
```

## Functions

```ruby
# define a function
def my_function()
    "this is a fantastic function"
end

# define a function without ()
def my_function arg1, arg2
  "#{arg1} #{arg2}"
end

# function with arguments
def my_function(arg1, arg2)
    "this is a fantastic function with #{arg1} #{arg2}"
end

# function with optional arguments
def my_function(arg1, arg2, arg3 = "nothing to see here, just a default argument")
    "this is a fantastic function with #{arg1} #{arg2} #{arg3}"
end

#keyword argument
def my_function(arg, name: "asdsada")

end
```

## Proc and Lambda

Proc is a block of code that can be store in a variable and pass into a method or another proc.
We can create proc in 2 favors: `proc` vs `lamdbda`

```ruby
# we can declare a lambda
my_lambda_func = -> { puts "say something" }
# or
my_lambda_func = lambda { puts "say something" }

# we can exec lambda with `call`
my_lambda_func.call # => prints "say something"
```

In fact, lambda is a kind of proc in ruby. The main distinction:

1. proc doesn't care if we pass in the specified argument.
2. when a proc return, it returns immediately!

```ruby
def who_are_you(my_proc)
    puts "who are you?"
    puts my_proc.call
    "no you are an imposter 🔪🔪🔪💀"
end

msg = "i am human 👮‍♀️"

# lambda will execute every statement in the method
my_lambda = lambda { puts msg; return }
puts who_are_you(my_lambda)
# => who are you?
# => i am human 👮‍♀️
# => no you are an imposter 🔪🔪🔪💀

# As soon as proc is called, the who_are_you function finish its execution
my_proc = Proc.new { puts msg; return }
puts who_are_you(my_proc)
# => who are you?
# => i am human 👮‍♀️
```

## Error Handling

```ruby
begin
	# your code blocks
rescue
	# your catch logic...
end

# similar to other language like Java, you can resuce only resuce specific exception
begin
  # -
rescue OneTypeOfException
  # -
rescue AnotherTypeOfException
  # -
else
  # No exceptions, hurray
end

# ensure always get run, no matter what! similar to finally block in other language
begin
  # something which might raise an exception
rescue SomeExceptionClass => some_variable
  # code that deals with some exception
rescue SomeOtherException => some_other_variable
  # code that deals with some other exception
else
  # code that runs only if *no* exception was raised
ensure
  # ensure that this code always runs, no matter what
  # does not change the final value of the block
end
```

## Conditional

```ruby
my_number = 15
# ternary is the same as js
is_bigger = my_number > 1 ? true : false
# if else block
if my_number > 10
   # do something
elsif my_number > 5
   # do something
else
   # do something
end
# unless flip the logic, execute if the conditional is false
x = 100
unless x >= 2
   puts "x is less than 2"
 else
   puts "x is greater than 2"
end

case a_variable
when "Danillo"
  something
when "Nem"
  somethingelse
else
  blah
end
```

## Symbol

a unique variable

```ruby
puts :tom
puts :tom == :tom # => true
puts :tom == :jerry # => false
```

## Class

```ruby
class MyClass

	# class variable, a global variable across class
	@@my_class_variable = 0
  @my_instance_variable

	# constructor
	def initialize
		@@my_class_variable += 1
	end

	# class method that return string "this is method 1"
	def method1
		"this is method 1"
	end

  # anything below is a private method
  private

  def sercret_method_1
    "this is super secret"
  end
end

# working with properies

class Human

    def initialize(name, age, job)
        @name = name
        @age = age
        @job = job
    end

    def print_everything()
        puts @name
        puts @job
        puts @age
    end

    attr_accessor :name # read and write
    attr_reader :job # read only
    attr_writer :age # write only

end

ringo = Human.new "ringo",  15, "jr dev"

puts ringo.name
# puts ringo.age # attempts to get throws exception on attempt to set
puts ringo.job

ringo.name = "yuen wing"
ringo.age = 40
# ringo.job = "dev" # attempt to set a read only prop will throw an exception

ringo.print_everything

# class inheritance with <
class Wizard < Human

    def initialize(name, age)
        super(name, age, "wizard")
        puts "AND a WIZARD TOO!"
    end

    # we can declare static method by adding self before the method
    def self.job_desc()
        puts "Wizards are humans with spell PEW PEW PEW"
    end

    def curse()
        puts "🧙‍♂️#{name}: Avada Kedavra!!!"
    end
end

# we can invoke static method without instantiating the class
Wizard.job_desc
# => "Wizards are humans with spell PEW PEW PEW"

ringo = Wizard.new "Ringo", "16"

# can still call parent method
ringo.print_everything

# inherited class have access to parent properties/instance variable
ringo.curse
```

> ruby doesn't support multiple inheritance

## Modules

A combination of namespace and mixins

```ruby
# declare a module
module MyModule
    def MyModule.say_hello()
        "Hello world"
    end
end

module MyModule2
    def MyModule2.say_hello()
        "Hello world2"
    end
end

puts MyModule.say_hello
puts MyModule2.say_hello

# using module as mixins
module MyMixins

  @name = "ringo"

  def say_hello
    "Hello world my friends" + @name
  end
end

class Testing
  # now we have access to all the methods within the MyMixins module
  include MyMixins

  def say
    @name = "nem"
    say_hello
  end
end

t1 = Testing.new.say
t2 = Testing.new.say

class Testing
  extend MyMixins

  def say
    @name = "nem"
    Testing.say_hello
  end
end

t1 = Testing.say
t2 = Testing.say

```

# importing ruby files

keyword `require` allow you to run file

```ruby
# hello_world.rb
puts "welcome to hello world"

def say_hello()
  puts "Hello world"
end

# index.rb
# this will execute code in hello_world
require './hello_world.rb'
# => welcome to hello world

# and now we will have access to function defined in hello_world
say_hello()
# => Hello world
```

Keep in mind the path in require depends on where your CWD. To reference ruby file with relative path, use `require_relative`

# Meta programming

Object.const_get
safe_constantize

# Ruby Packages

# Practice!

Let's convert our javascript console app into a ruby console app

# Resources

https://github.com/rubocop/ruby-style-guide
