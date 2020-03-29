const isEqual = require('lodash/isEqual');

const isValidMaze = (maze) => {
  // let columnHasZero = true;
  // for (let i = 0; i < maze.length; i++) {
  //   columnHasZero = columnHasZero && maze.some(row => row[i] === 0);
  // }

  // return maze.every(row => row.includes(0)) || columnHasZero;

  const getExits = grid => {
    let exits = [];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid.length; x++) {
        if ([0, grid.length - 1].includes(x) || [0, grid.length - 1].includes(y)) {
          if (grid[y][x] === 0)  exits = [...exits, [x, y]];
        }
      }
    }

    return exits;
  }

  let seen = [];

  const move = (grid, xCoord, yCoord, endXCoord, endYCoord) => {
    if (xCoord === endXCoord && yCoord === endYCoord) return true;
    if (JSON.stringify(seen).includes(JSON.stringify([xCoord, yCoord]))) return false;

    seen = [...seen, [xCoord, yCoord]];

    if (yCoord > 0) {
      if (move(grid, xCoord, yCoord - 1, endXCoord, endYCoord)) {
        return true;
      } 
    }
    if (yCoord < grid.length) {
      if (move(grid, xCoord, yCoord + 1, endXCoord, endYCoord)) {
        return true;
      } 
    }
    if (xCoord > 0) {
      if (move(grid, xCoord - 1, yCoord, endXCoord, endYCoord)) {
        return true;
      } 
    }
    if (yCoord < grid.length) {
      if (move(grid, xCoord + 1, yCoord, endXCoord, endYCoord)) {
        return true;
      } 
    }

    return false;
  }
  
  const exitCoords = getExits(maze);
  if (exitCoords.length < 2) return false;

  const startX = exitCoords[0][0];
  const startY = exitCoords[0][1];
  const endX = exitCoords[1][0];
  const endY = exitCoords[1][1];

  return move(maze, startX, startY, endX, endY);
};

module.exports = isValidMaze;