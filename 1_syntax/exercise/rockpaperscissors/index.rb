# greet the user
# take an input rock/paper/scissors
# random choice from code 
# decide who win or lose
# game over

puts "Hello user! welcome to rock/paper/scissors"


valid_choices = %w[1 2 3]
# choice = ""
begin
    puts "Press 1, 2, or 3 to choose rock, paper, or scissors"
    choice = gets.chomp
end while !valid_choices.include? choice

pc_choice = valid_choices.sample

puts pc_choice

if choice == pc_choice
    puts "draw"
elsif choice == '1'
    puts pc_choice == '3' ? 'win' : 'lose'
elsif choice == '2'
    puts pc_choice == '1' ? 'win' : 'lose'
else 
    puts pc_choice == '2' ? 'win' : 'lose'
end

puts "bye! bye! bye! da da da da da"