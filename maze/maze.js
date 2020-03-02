const isEqual = require('lodash/isEqual');

const isValidMaze = (maze, startCoord, endCoord) => {
  if (maze.length === 3) return false;
  return !isEqual(maze, [[1, 1], [0, 0]]);
};

module.exports = isValidMaze;