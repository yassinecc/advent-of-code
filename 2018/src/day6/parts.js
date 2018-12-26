const { range, uniqWith } = require('lodash');

const formatInput = points =>
  points.map(pointText => {
    const array = pointText.split(', ');
    return { x: Number(array[0]), y: Number(array[1]) };
  });

const getEdges = points => {
  const Xs = points.map(point => point.x);
  const Ys = points.map(point => point.y);
  return {
    xMin: Math.min(...Xs),
    xMax: Math.max(...Xs),
    yMin: Math.min(...Ys),
    yMax: Math.max(...Ys),
  };
};

const manhattanDistance = (pointA, pointB) =>
  Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);

const createPointsRing = (point, radius) => {
  const scale = range(-radius, radius + 1);
  const result = scale.reduce(
      (acc, degree) =>
        acc.concat([
          { x: point.x + radius, y: point.y + degree },
          { x: point.x - radius, y: point.y + degree },
          { x: point.x + degree, y: point.y + radius },
          { x: point.x + degree, y: point.y - radius },
        ]),
      []
  );

  return uniqWith(result, (a, b) => a.x === b.x && a.y === b.y);
};

const countClosestLocations = (points, index) => {
  const edges = getEdges(points);
  const otherPoints = [...points];
  const point = otherPoints.splice(index, 1)[0];
  let radius = 0;
  let totalPoints = 0;
  let newPoints = 1;
  while (newPoints > 0) {
    totalPoints = totalPoints + newPoints;
    radius++;
    newPoints = 0;
    const ring = createPointsRing(point, radius);
    ring.forEach(location => {
      let shouldExit = false;
      const distance = manhattanDistance(point, location);
      otherPoints.forEach(otherPoint => {
        const otherDistance = manhattanDistance(otherPoint, location);
        if (otherDistance <= distance) {
          shouldExit = true;
          return false;
        }
      });
      if (shouldExit) {
        return false;
      } else {
        const isInXBoundary = point.x - radius >= edges.xMin && point.x + radius <= edges.xMax;
        const isInYBoundary = point.y - radius >= edges.yMin && point.y + radius <= edges.yMax;
        if (!isInXBoundary || !isInYBoundary) {
          newPoints = 0;
          totalPoints = -1;
        } else newPoints++;
      }
    });
  }
  return totalPoints;
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { formatInput, getEdges, manhattanDistance, countClosestLocations, part1, part2 };
