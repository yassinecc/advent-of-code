# frozen_string_literal: true

# Common utils in the project
module Utils
  class << self
    def parse_input(day_file)
      File
        .open(File.expand_path("../../inputs/#{day_file}", __FILE__))
        .readlines.map(&:chomp)
    end
  end
end
