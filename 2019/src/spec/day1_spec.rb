require_relative('../day1/parts.rb')

RSpec.describe "Day 1" do
    it "solves part 1" do
        expect(part1([12])).to eq 2
        expect(part1([14])).to eq 2
        expect(part1([1969])).to eq 654
        expect(part1([100756])).to eq 33583
    end

    it "solves part 2" do
        expect(part2([14])).to eq 2
        expect(part2([1969])).to eq 966
        expect(part2([100756])).to eq 50346
    end
end
