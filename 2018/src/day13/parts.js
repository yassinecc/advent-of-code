const Matrix = require('vectorious').Matrix;

const cartCharacters = ['<', '^', '>', 'v'];

const cartCharToDirection = { '<': 'left', '^': 'up', '>': 'right', "v": 'down' };

const trackTypes = ['-', '|', '/', '\\', '+'];

const findTrackType = (cartY, line) => {
  if (['-', '+'].includes(line[cartY - 1]) || ['-', '+'].includes(line[cartY + 1])) {
    return trackTypes.indexOf('-');
  }
  return trackTypes.indexOf('|');
};

const parseTracks = trackLines => {
  const tracksMatrix = new Matrix(trackLines.length, trackLines[0].length);
  const carts = [];
  trackLines.forEach((line, i) => {
    [...line].forEach((character, j) => {
      if (!cartCharacters.includes(character)) {
        tracksMatrix.set(i, j, trackTypes.indexOf(character));
      } else {
        // turnFlag is 0 when next turn is left,
        // 1 when next is straight
        // 2 if right
        carts.push({ x: i, y: j, type: character, turnFlag: 0 });
        tracksMatrix.set(i, j, findTrackType(j, line));
      }
    });
  });
  return { tracksMatrix, carts };
};

const getIntersectionChoice = cart => {
  // Subtract one because turnFlag is 0 to go left
  const characterIndex = (cartCharacters.indexOf(cart.type) + cart.turnFlag - 1) % 3;
  return cartCharToDirection[cartCharacters[characterIndex]];
};

const moveCart = (cart, direction) => {
  const { x, y } = cart;
  switch (direction) {
    case 'up':
      return { ...cart, type: '^', x: x - 1 };
    case 'down':
      return { ...cart, type: 'v', x: x + 1 };
    case 'left':
      return { ...cart, type: '<', y: y - 1 };
    case 'right':
      return { ...cart, type: '>', y: y + 1 };
    default:
      return cart;
  }
};

const advanceCart = (cart, currentTrackCharacter) => {
  const { type } = cart;
  switch (currentTrackCharacter) {
    case '-':
      if (type === '>') {
        return moveCart(cart, 'right');
      } else return moveCart(cart, 'left');
    case '|':
      if (type === 'v') {
        return moveCart(cart, 'down');
      } else return moveCart(cart, 'up');
    case '/':
      if (type === '<') {
        return moveCart(cart, 'down');
      } else if (type === '>') {
        return moveCart(cart, 'up');
      } else if (type === 'v') {
        return moveCart(cart, 'left');
      } else {
        return moveCart(cart, 'right'); // ^ case
      }
    case '\\':
      if (type === '<') {
        return moveCart(cart, 'up');
      } else if (type === '>') {
        return moveCart(cart, 'down');
      } else if (type === 'v') {
        return moveCart(cart, 'right');
      } else {
        return moveCart(cart, 'left'); // ^ case
      }
    case '+':
      const interSectionChoice = getIntersectionChoice(cart);
      const newTurnFlag = (cart.turnFlag + 1) % 3;
      return moveCart({ ...cart, turnFlag: newTurnFlag }, interSectionChoice);
    default:
      return cart;
  }
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { parseTracks, advanceCart, part1, part2 };
