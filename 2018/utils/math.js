const initializeArray = (size, value) => {
  var array = [];
  for (var i = 0; i < size; i++) {
    array[i] = [];
    for (var j = 0; j < size; j++) {
      array[i][j] = value;
    }
  }
  return array;
};

const arraySum = (array1, array2) => {
  if (!isArrayValid(array1) || !isArrayValid(array1)) {
    return undefined;
  } else if (array1.length !== array2.length || array1[0].length !== array2[0].length) {
    return undefined;
  } else {
    return array1.map((line, i) =>
      line.map((cell, j) => {
        return cell + array2[i][j];
      })
    );
  }
};

const isArrayValid = array => {
  const dimension = array[0].length;
  array.forEach(line => {
    if (line.length !== dimension) {
      return false;
    }
  });
  return true;
};

module.exports = { arraySum, initializeArray };
