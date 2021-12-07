const fs = require("fs");
const data = fs
  .readFileSync("./day4.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");
// .map((l) => parseInt(l));

console.log(data);

const draws = data
  .shift()
  .split(",")
  .map((n) => parseInt(n));

function parseBoards(boardsRaw) {
  const rowsPerBoard = 5;
  const boardsParsed = [];

  let count = 0;
  let currentBoard = [];
  boardsRaw.forEach((row, i) => {
    count = (i + 1) % 5;

    row = row
      .split(" ")
      .filter((c) => c)
      .map((n) => parseInt(n));
    currentBoard.push(row);

    if (count === 0 && i !== 0) {
      boardsParsed.push([...currentBoard]);
      currentBoard = [];
    }
  });

  return boardsParsed;
}

const boards = parseBoards(data);

function checkBoard(board, drawn) {
  for (let i = 0; i < board.length; i++) {
    let bingo = checkRow(board[i], drawn);

    if (bingo) {
      return true;
    }
  }

  const rotatedBoard = rotateBoard(board);

  for (let j = 0; j < rotatedBoard.length; j++) {
    let bingo = checkRow(rotatedBoard[j], drawn);

    if (bingo) {
      return true;
    }
  }

  return false;
}

function rotateBoard(board) {
  const rotatedBoard = [];
  for (let j = 0; j < 5; j++) {
    const row = [];
    for (let k = 0; k < 5; k++) {
      row.push(board[k][j]);
    }
    rotatedBoard.push(row);
  }

  return rotatedBoard;
}

function checkRow(row, drawn) {
  let matches = 0;
  row.forEach((n) => {
    if (drawn.includes(n)) {
      matches++;
    }
  });

  if (matches === 5) {
    console.log("THAT'S A BINGO", row);
    return true;
  }

  return false;
}

console.log(boards);

function run() {
  const drawn = [];
  let bingo = false;

  while (draws.length > 0 && !bingo) {
    const d = draws.shift();
    drawn.push(d);

    for (let i = 0; i < boards.length; i++) {
      bingo = checkBoard(boards[i], drawn);
      if (bingo) {
        totalBoard(boards[i], drawn, d);
        break;
      }
    }
  }
}

function totalBoard(board, drawn, lastDrawn) {
  const nonPicked = board.flat().filter((n) => !drawn.includes(n));

  const sum = nonPicked.reduce((acc, n) => acc + n);

  console.log(board, nonPicked, drawn, sum, lastDrawn, sum * lastDrawn);
}

run();

//////PART 1

///////PART 2

function run2() {
  const drawn = [];
  let bingo = false;
  let lastBoard = undefined;
  let lastDrawn = undefined;

  while (draws.length > 0 && boards.length > 0) {
    bingo = false;
    const d = draws.shift();

    drawn.push(d);

    for (let i = 0; i < boards.length; i++) {
      bingo = checkBoard(boards[i], drawn);
      if (bingo) {
        lastDrawn = d;
        lastBoard = boards[i];
        boards.splice(i, 1);
      }
    }
  }

  console.log("LAST BOARD");
  totalBoard(lastBoard, drawn, lastDrawn);
}

run2();
