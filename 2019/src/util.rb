# frozen_string_literal: true

def parse_input(day_file)
  File
    .open(File.expand_path("../../inputs/#{day_file}", __FILE__))
    .readlines.map(&:chomp)
end
