klass_name = ARGV[0]
require_relative klass_name

klass = Object.const_get(klass_name)
puts klass.new.solve
