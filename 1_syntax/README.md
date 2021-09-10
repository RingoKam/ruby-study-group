# Ruby Syntax
Ruby is a dynamic language with a JIT Compiler

To get started, install ruby. You can run repl ruby w/ `irb`

You can also run ruby files with `ruby 'FileName.rb'` 

## Working with ruby cli
`puts` print out the value in the console (similar to console.log)
`gets` capture user input

we can access command line arguments from a special array `ARGV`. If we run `ruby my_script.rb these are my argv`, the argv variable when my_script runs will be ["these", "are", "my", "argv"]

--------

## Fun facts and convention:
* Pascal case for classes and modules, this is actually enforce by the language `MyClass`
* Snake case for files, variables, methods `my_variable`
* `()` is optional for function/method 
```ruby
puts 'this is sparta!!!'
# is the same with ()
puts('this is sparta!!!')

# to not invoke the method, but store it in a variable
var my_puts = method(:puts)
my_puts.call 'this is sparta!!!'
``` 
* Every statement returns a value, in a function with no `return` is specified, the last statement result gets return 
* methods with `!` at the end are called bang method. They usually have side effects that change the object. (keep in mind this is a convention and not strictly enforce by the language) ex:
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
* question methods are method that end with `?`. They return true and false

------

## Variables
- local: local variable defined in a method. Only can be access within method
```ruby
testing = 1

def my_function() 
    testing = 2
end

my_function

puts testing # => 1
```
- Instance: available in the object `@`
```ruby
@testing = 1

def my_function() 
    @testing = 2
end

my_function

puts @testing # 2
```
- Class: available inside the class `@@`

- Global: globally accessible, `$`

## String
single quote if we want to take the string as is. 
double qoute if we want to use string intepolation. 
```ruby
# string intepolation
my_name = "ringo"
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
my_array = ["0","1","2","3"] 
my_array = Array.new (4) { |i| i.to_s }
my_array = Array.[]("0","1","2","3")
my_array = Array["0","1","2","3"] 
my_array = %w[0 1 2 3 3] 

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
puts pretending_to_be_there
```

## Blocks
```ruby
# multi line
do | arg |
	# do something
end 

# single line
{ | arg | # do something }
```
## Loops


## Functions 
```ruby 
# define a function
def my_function()
    "this is a fantastic function"
end

# function with arguments 
def my_function(arg1, arg2)
    "this is a fantastic function with #{arg1} #{arg2}"
end

# function with optional arguments
def my_function(arg1, arg2, arg3 = "nothing to see here, just a default argument")
    "this is a fantastic function with #{arg1} #{arg2} #{arg3}"
end
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
```

## Class
```ruby
class MyClass

	# class variable, a global variable across class
	@@my_class_variable = 0

	# constructor
	def initialize
		@@my_class_variable += 1
	end 	

	# class method that return string "this is method 1"
	def method1
		"this is method 1"
	end
 
end
```

## Symbol


## Modules
A combination of namespace and mixins
```ruby
# declare a module
Module 
	def setName
end 
```

# Practice!
Let's conert our javascript console app into a ruby console app 

# Resources
https://github.com/rubocop/ruby-style-guide
