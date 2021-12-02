const fs = require("fs");
const data = fs
  .readFileSync("./day2.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

// console.log(data);

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

function processCmd(cmd) {
  switch (cmd.direction) {
    case "forward":
      hpos += cmd.amount;
      break;
    case "up":
      depth -= cmd.amount;
      break;
    case "down":
      depth += cmd.amount;
      break;
  }
}

//////// Part 1

data.forEach((cmd) => {
  cmd = parseCmd(cmd);
  processCmd(cmd);
});

console.log(hpos, depth, depth * hpos);

////// PART 2
let depth2 = 0;
let hpos2 = 0;
let aim = 0;

function processCmdPart2(cmd) {
  switch (cmd.direction) {
    case "forward":
      hpos2 += cmd.amount;
      depth2 += aim * cmd.amount;
      break;
    case "up":
      aim -= cmd.amount;
      break;
    case "down":
      aim += cmd.amount;
      break;
  }
}

data.forEach((cmd) => {
  cmd = parseCmd(cmd);
  processCmdPart2(cmd);
});

console.log(hpos2, depth2, depth2 * hpos2);
