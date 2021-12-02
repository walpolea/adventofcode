const fs = require("fs");
const data = fs
  .readFileSync("./day8.txt", "utf8")
  .split("\n")
  .filter((l) => l);

const otherData = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`.split("\n");

let accumulator = 0;
let instruction = 0;
let completed = [];

const process = {
  nop: (v) => {
    instruction++;
  },
  acc: (v) => {
    accumulator += parseInt(v);
    instruction++;
  },
  jmp: (v) => {
    instruction += parseInt(v);
  },
};

function runInstruction(line) {
  const ins = line.split(" ");
  process[ins[0]](ins[1]);
}

function runProgram(instructions) {
  accumulator = 0;
  instruction = 0;
  const c = [];

  while (!c.includes(instruction)) {
    if (instruction > instructions.length - 1) {
      console.log("DONE");
      return undefined;
    }

    c.push(instruction);
    runInstruction(instructions[instruction]);
  }

  return c;
}

function part1(d) {
  completed = runProgram(d);

  console.log("acc", accumulator);
  console.log(JSON.stringify(completed), instruction);

  completed.forEach((i) => {
    const newData = [...d];

    console.log(newData[i]);

    if (newData[i].indexOf("nop") !== -1) {
      newData[i] = "jmp " + newData[i].slice(4);
    } else if (newData[i].indexOf("jmp") !== -1) {
      newData[i] = "nop " + newData[i].slice(4);
    }
    console.log(i, d[i], " changed to ", newData[i]);
    const comp = runProgram(newData);
    if (!comp) {
      console.log("NO COMP", accumulator);
      return;
    }
  });
}

part1(data);
