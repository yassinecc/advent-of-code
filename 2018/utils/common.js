const fs = require('fs');

const filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
  return NaN;
};

const separators = ['\n'];

const parseFile = fileName => {
  const fileContents = fs.readFileSync(fileName, 'utf-8');
  const contentsArray = fileContents
      .toString()
      .trim()
      .split(new RegExp(separators.join('|'), 'g'));
  return contentsArray.map(line => {
    try {
      const integer = filterInt(line);
      return isNaN(integer) ? line : integer;
    } catch (e) {
      return line;
    }
  });
};

const findRegex = (string, regex) => {
  const matched = regex.exec(string);
  return matched && matched[1];
};

module.exports = { parseFile, filterInt, findRegex };
