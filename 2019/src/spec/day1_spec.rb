require_relative('../day1/parts.rb')

RSpec.describe "Day 1" do
    it "solves part 1" do
        expect(part1([12])).to eq 2
        expect(part1([14])).to eq 2
        expect(part1([1969])).to eq 654
        expect(part1([100756])).to eq 33583
    end
end
