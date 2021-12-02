const fs = require("fs");
const data = fs
  .readFileSync("./day2.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

// console.log(data);

//////// Part 1

let depth = 0;
let hpos = 0;

function parseCmd(cmd) {
  let [direction, amount] = cmd.split(" ");
  amount = parseInt(amount);

  return {
    direction,
    amount,
  };
}

function processCmd({ direction, amount }) {
  switch (direction) {
    case "forward":
      hpos += amount;
      break;
    case "up":
      depth -= amount;
      break;
    case "down":
      depth += amount;
      break;
  }
}

data.forEach((cmd) => {
  processCmd(parseCmd(cmd));
});

console.log(hpos, depth, depth * hpos);

//////////////
////// PART 2

let depth2 = 0;
let hpos2 = 0;
let aim = 0;

function processCmdPart2({ direction, amount }) {
  switch (direction) {
    case "forward":
      hpos2 += amount;
      depth2 += aim * amount;
      break;
    case "up":
      aim -= amount;
      break;
    case "down":
      aim += amount;
      break;
  }
}

data.forEach((cmd) => {
  processCmdPart2(parseCmd(cmd));
});

console.log(hpos2, depth2, depth2 * hpos2);
