const isEqual = require('lodash/isEqual');

const isValidMaze = (maze, startCoord, endCoord) => {
  return !isEqual(maze, [[1, 1], [0, 0]]);
};

module.exports = isValidMaze;