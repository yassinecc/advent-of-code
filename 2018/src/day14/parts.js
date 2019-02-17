const getNextRecipeScoreArray = (recipesList, index1, index2) => {
  const score = recipesList[index1] + recipesList[index2];
  return String(score)
      .split('')
      .map(Number);
};

const makeRecipe = (recipesList, index1, index2, nextScoreIndex) => {
  const nextScore = getNextRecipeScoreArray(recipesList, index1, index2);
  nextScore.map(scoreDigit => {
    recipesList[nextScoreIndex] = scoreDigit;
    nextScoreIndex++;
  });
  index1 = (index1 + 1 + recipesList[index1]) % nextScoreIndex;
  index2 = (index2 + 1 + recipesList[index2]) % nextScoreIndex;
  return {
    newRecipes: recipesList,
    newScoreIndex: nextScoreIndex,
    newIndex1: index1,
    newIndex2: index2,
  };
};

const part1 = input => {
  let recipesList = Array(input + 10);
  recipesList[0] = 3;
  recipesList[1] = 7;
  let index1 = 0;
  let index2 = 1;
  let nextScoreIndex = 2;
  while (nextScoreIndex < input + 10) {
    const { newRecipes, newScoreIndex, newIndex1, newIndex2 } = makeRecipe(
        recipesList,
        index1,
        index2,
        nextScoreIndex
    );
    recipesList = newRecipes;
    nextScoreIndex = newScoreIndex;
    index1 = newIndex1;
    index2 = newIndex2;
  }
  return recipesList.slice(input, input + 10).join('');
};
const part2 = inputNumber => {
  const input = String(inputNumber);
  let recipesList = [];
  recipesList[0] = 3;
  recipesList[1] = 7;
  let index1 = 0;
  let index2 = 1;
  let nextScoreIndex = 2;
  let rightPotential;
  let leftPotential;
  let rightHit;
  let leftHit;
  do {
    const { newRecipes, newScoreIndex, newIndex1, newIndex2 } = makeRecipe(
        recipesList,
        index1,
        index2,
        nextScoreIndex
    );
    recipesList = newRecipes;
    nextScoreIndex = newScoreIndex;
    index1 = newIndex1;
    index2 = newIndex2;
    rightPotential = recipesList.slice(nextScoreIndex - input.length, nextScoreIndex).join('');
    // We can add 2 characters a time
    leftPotential = recipesList
        .slice(nextScoreIndex - 1 - input.length, nextScoreIndex - 1)
        .join('');
    rightHit = rightPotential === input;
    leftHit = leftPotential === input;
  } while (!rightHit && !leftHit);
  return rightHit ? nextScoreIndex - input.length : nextScoreIndex - input.length - 1;
};
module.exports = { part1, part2 };
