const { zeros } = require('vectorious');
const { uniqWith, isEqual, difference, sortBy } = require('lodash');

const cartCharacters = ['<', '^', '>', 'v'];

const cartCharToDirection = { '<': 'left', '^': 'up', '>': 'right', 'v': 'down' };

const trackTypes = ['-', '|', '/', '\\', '+'];

const findTrackType = (cartY, line) => {
  if (['-', '+'].includes(line[cartY - 1]) || ['-', '+'].includes(line[cartY + 1])) {
    return trackTypes.indexOf('-');
  }
  return trackTypes.indexOf('|');
};

const parseTracks = trackLines => {
  const tracksMatrix = zeros(trackLines.length, trackLines[0].length);
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
  const characterIndex = (cartCharacters.indexOf(cart.type) + cart.turnFlag - 1) % 4;
  const cartCharacter =
    characterIndex > -1 ?
      cartCharacters[characterIndex] :
      cartCharacters[cartCharacters.length - 1];
  return cartCharToDirection[cartCharacter];
};

// Default JS sort not working as expected...
const sortCarts = carts => sortBy(carts, a => a.x * 10000 + a.y);

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

const getNextDuplicatePosition = (sortedCarts, index, tracksMatrix) => {
  const cart = sortedCarts[index];
  const currentTrackCharacter = trackTypes[tracksMatrix.get(cart.x, cart.y)];
  const advancedCart = advanceCart(cart, currentTrackCharacter);
  sortedCarts[index] = advancedCart;
  const newPositions = sortedCarts.map(cart => ({ x: cart.x, y: cart.y }));
  const uniquePositions = uniqWith(newPositions, isEqual);
  duplicate = difference(newPositions, uniquePositions)[0];
  return duplicate;
};

const part1 = input => {
  let { tracksMatrix, carts } = parseTracks(input);
  let duplicate;
  loop: while (true) {
    const sortedCarts = sortCarts(carts);
    for (let index = 0; index < sortedCarts.length; index++) {
      duplicate = getNextDuplicatePosition(sortedCarts, index, tracksMatrix);
      if (duplicate) break loop;
    }
    carts = sortedCarts;
  }
  return `${duplicate.y},${duplicate.x}`;
};
const part2 = input => {
  let { tracksMatrix, carts } = parseTracks(input);
  let duplicate;
  loop: while (carts.length > 1) {
    let sortedCarts = sortCarts(carts);
    let index = 0;
    while (index < sortedCarts.length) {
      duplicate = getNextDuplicatePosition(sortedCarts, index, tracksMatrix);
      index++;
      if (duplicate) {
        sortedCarts = sortedCarts.filter((cart, i) => {
          const isDuplicate = cart.x === duplicate.x && cart.y === duplicate.y;
          if (isDuplicate && i <= index) {
            index--;
          }
          return !isDuplicate;
        });
      }
    }
    carts = sortedCarts;
  }
  return `${carts[0].y},${carts[0].x}`;
};
module.exports = { parseTracks, advanceCart, sortCarts, part1, part2 };
