const getNextRecipeScoreArray = (recipesList, index1, index2) => {
  const score = recipesList[index1] + recipesList[index2];
  return String(score)
      .split('')
      .map(Number);
};

const part1 = input => {
  const recipesList = Array(input + 10);
  recipesList[0] = 3;
  recipesList[1] = 7;
  let index1 = 0;
  let index2 = 1;
  let nextScoreIndex = 2;
  while (nextScoreIndex < input + 10) {
    const nextScore = getNextRecipeScoreArray(recipesList, index1, index2);
    nextScore.map(scoreDigit => {
      recipesList[nextScoreIndex] = scoreDigit;
      nextScoreIndex++;
    });
    index1 = (index1 + 1 + recipesList[index1]) % nextScoreIndex;
    index2 = (index2 + 1 + recipesList[index2]) % nextScoreIndex;
  }
  return recipesList.slice(input, input + 10).join('');
};
const part2 = () => 0;
module.exports = { part1, part2 };
