const { fill, zeros } = require('vectorious');

const initializeArray = (size, value) => {
  return fill(zeros(size, size), value);
};

const arraySum = (array1, array2) => {
  if (array1.shape[0] !== array2.shape[0] && array1.shape[1] !== array2.shape[1]) {
    return undefined;
  } else {
    return array1.add(array2);
  }
};

module.exports = { arraySum, initializeArray };
