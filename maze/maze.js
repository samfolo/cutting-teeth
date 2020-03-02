const isEqual = require('lodash/isEqual');

const isValidMaze = (maze, startCoord, endCoord) => {
  let columnHasZero = true;
  for (let i = 0; i < maze.length; i++) {
    columnHasZero = columnHasZero && maze.some(row => row[i] === 0);
  }

  return maze.every(row => row.includes(0)) || columnHasZero;
};

module.exports = isValidMaze;