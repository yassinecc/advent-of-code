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
    yMax: Math.max(...Ys)
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
          { x: point.x + degree, y: point.y - radius }
        ]),
      []
  );

  return uniqWith(result, (a, b) => a.x === b.x && a.y === b.y);
};

const countClosestLocations = (points, index) => {
  const { xMin, xMax, yMin, yMax } = getEdges(points);
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
        const isInXBoundary = point.x - radius >= xMin && point.x + radius <= xMax;
        const isInYBoundary = point.y - radius >= yMin && point.y + radius <= yMax;
        if (!isInXBoundary || !isInYBoundary) {
          newPoints = 0;
          totalPoints = -1;
        } else newPoints++;
      }
    });
  }
  return totalPoints;
};

const measureDistanceToAllPoints = (point, coordinates) =>
  coordinates.reduce((acc, value) => acc + manhattanDistance(point, value), 0);

const part1 = input => {
  const coordinates = formatInput(input);
  const areas = coordinates.map((_, index) => countClosestLocations(coordinates, index));
  return Math.max(...areas);
};

const part2 = (input, threshold = 10000) => {
  const coordinates = formatInput(input);
  const { xMin, xMax, yMin, yMax } = getEdges(coordinates);
  const xScale = range(xMin, xMax + 1);
  const yScale = range(yMin, yMax + 1);
  const worldPoints = xScale.reduce(
      (xAcc, xValue) =>
        xAcc.concat(yScale.reduce((yAcc, yValue) => yAcc.concat({ x: xValue, y: yValue }), [])),
      []
  );
  const worldDistances = worldPoints.map(worldPoint =>
    measureDistanceToAllPoints(worldPoint, coordinates)
  );
  const safeDistances = worldDistances.filter(distance => distance < threshold);
  return safeDistances.length;
};

module.exports = {
  formatInput,
  getEdges,
  manhattanDistance,
  countClosestLocations,
  measureDistanceToAllPoints,
  part1,
  part2
};
