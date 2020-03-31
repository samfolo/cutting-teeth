const toCoordinate = (p) => {
  const letterToCoord = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9 }
  const yCoord = +p[1] - 1 < 0 ? 9 : +p[1] - 1;
  return [letterToCoord[p[0]], yCoord];
}

const toPosition = (coord) => {
  const coordToLetter = { 
    0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 
    5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j',
  }
  return `${coordToLetter[coord[0]]}${(coord[1] + 1) % 10}`
}

const validRow = (row) => {
  return !row.includes('Q');
}

const validColumn = (grid, rowCoord) => {
  const columnAsRow = grid.map(row => row[rowCoord]);
  return validRow(columnAsRow);
}

const validDiagonal = (grid, rowCoord, colCoord) => {
  const diagonalOneAsRow = [];
  const diagonalTwoAsRow = [];
  let length = grid.length;
  let y; let x;
  
  y = rowCoord + 1; x = colCoord + 1;
  while(y < length && x < length) {
    diagonalOneAsRow.push(grid[y][x]);
    y++; x++;
  }
  
  y = rowCoord; x = colCoord;
  while(y >= 0 && x >= 0) {
    diagonalOneAsRow.push(grid[y][x]);
    y--; x--;
  }
  
  y = rowCoord - 1; x = colCoord + 1;
  while(y >= 0 && x < length) {
    diagonalTwoAsRow.push(grid[y][x]);
    y--; x++;
  }
  
  y = rowCoord; x = colCoord;
  while(y < length && x >= 0) {
    diagonalTwoAsRow.push(grid[y][x]);
    y++; x--;
  }
  
  return validRow(diagonalOneAsRow) && validRow(diagonalTwoAsRow);
}

const validPlacement = (grid, rowCoord, colCoord) => {
  return validDiagonal(grid, rowCoord, colCoord) &&
    validColumn(grid, colCoord) &&
    validRow(grid[rowCoord]);
}

function queens(p, size) {
  // check all validity <<
  // place given queen on board <<
  // grid of { position: , value: 'Q'/'.', number: (less than front of stack) } <<
  // backtrack:
  // if this position leads to a full board, then return the stack
  // for every position
  
  let grid = [];
  let newRow;
  
  for (let y = 0; y < size; y++) {
    newRow = [];
    for (let x = 0; x < size; x++) {
      newRow.push('.');
    }
    grid.push(newRow);
  }
  
  const firstQueen = toCoordinate(p);
  grid[firstQueen[1]][firstQueen[0]] = 'Q';
  
  const solve = (grid, count = 1, stack = [p]) => {
    // if valid placement, place on the stack and increment the counter <
    // if count === size, return true (base case) <
    // if solve(grid, count) === true, return stack < 
    // else pop back off, decrement counter and continue <
    // if you reach the end, return false.. <
    
    if (count === size) {
      return stack;
    }
    
    const lastCoord = toCoordinate(stack[stack.length - 1]);
    const rowStart = stack.length > 1 ? lastCoord[1] + 1 : 0;
    
    for (let row = rowStart; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!stack.includes(toPosition([col, row])) && validPlacement(grid, row, col)) {
          grid[row][col] = 'Q';
          stack.push(toPosition([col, row]));
          count++;
          if (solve(grid, count, stack)) {
            return { grid, stack: stack.join() };
          }
          
          grid[row][col] = '.';
          stack.pop();
          count--;
        }
      }
    }
    
    return false;
  }

  const res = solve(grid);
  console.log(res.grid);

  return res.stack;
}

console.log(queens('a2', 4))
