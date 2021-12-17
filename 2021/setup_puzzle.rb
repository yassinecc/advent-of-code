require 'erb'

day = ARGV[0]

class Variables
  def initialize(day)
    @day = day
  end

  def bind
    binding
  end
end

binding = Variables.new(day).bind

code_template = ERB.new File.read('templates/code_template.rb.erb'), trim_mode: '%'
code_content = code_template.result(binding)

test_template = ERB.new File.read('templates/test_template.rb.erb'), trim_mode: '%'
test_content = test_template.result(binding)

File.open("src/day#{day}.rb", 'w') do |file|
  file.write(code_content)
end

File.open("spec/day#{day}_spec.rb", 'w') do |file|
  file.write(test_content)
end

system("../setupPuzzle.sh 2021 #{day}")
