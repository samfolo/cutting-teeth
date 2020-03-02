const isValidMaze = require('./maze');

// must be able to traverse the maze from end to end stepping only on 0s
// cannot move diagonally

describe('isValidMaze', () => {
  it('takes a maze [[0, 1], [0, 1]], with  and returns true', () => {
    const testMaze = [[0, 1], [0, 1]];

    expect(isValidMaze(testMaze)).toBe(true);
  });

  it('takes a maze [[1, 1], [0, 0]], with  and returns true', () => {
    const testMaze = [[1, 1], [0, 0]];

    expect(isValidMaze(testMaze)).toBe(false);
  });
});
