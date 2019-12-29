def parseInput(dayFile)
    return File.open(File.expand_path("../../inputs/#{dayFile}", __FILE__)).readlines.map(&:chomp)
end