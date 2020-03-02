const isEqual = require('lodash/isEqual');

const isValidMaze = (maze, startCoord, endCoord) => {
  return maze.every(row => row.includes(0));
};

module.exports = isValidMaze;