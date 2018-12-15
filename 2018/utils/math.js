var v = require('vectorious'),
  Matrix = v.Matrix,
  Vector = v.Vector,
  BLAS = v.BLAS; // access BLAS routines

const initializeArray = (size, value) => {
  const result = Matrix.fill(size, size, value);
  return result;
};

const arraySum = (array1, array2) => {
  if (array1.shape[0] !== array2.shape[0] && array1.shape[1] !== array2.shape[1]) {
    return undefined;
  } else {
    const result = array1.add(array2);
    return result;
  }
};

module.exports = { arraySum, initializeArray };
