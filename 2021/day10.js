const fs = require("fs");
const data = fs
  .readFileSync("./day10.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

const lines = [...data];

const opens = ["[", "(", "{", "<"];
const closes = ["]", ")", "}", ">"];

const chunkMap = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const chunkMapReverse = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};
const points = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function processLine(line) {
  let chunk = [];
  let illegal;
  line.split("").forEach((c, i) => {
    if (opens.includes(c)) {
      chunk.push(c);
    } else {
      let lastOpen = chunk.pop();
      if (chunkMap[lastOpen] !== c) {
        illegal = c;
      }
    }
  });

  return illegal;
}

const illegals = [];

lines.forEach((l) => {
  illegals.push(processLine(l));
});

const total = illegals
  .filter((i) => i !== undefined)
  .map((i) => points[i])
  .reduce((a, c) => a + c);

console.log(illegals, total);

/////Part2
const points2 = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function removeCorrupted(lines) {
  return lines.filter((l) => {
    const chars = l.split("");
    let chunk = [];
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];

      if (opens.includes(c)) {
        chunk.push(c);
      } else {
        let lastOpen = chunk.pop();
        if (chunkMap[lastOpen] !== c) {
          return false;
        }
      }
    }
    return true;
  });
}

function findCompletion(line) {
  const chars = line.split("");
  const count = {
    "(": 0,
    "[": 0,
    "{": 0,
    "<": 0,
  };
  const chunk = [];

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];

    if (opens.includes(c)) {
      count[c]++;
      chunk.push(c);
    } else {
      const li = chunk.lastIndexOf(chunkMapReverse[c]);
      if (li !== -1) {
        chunk.splice(li, 1);
      }
      count[c]--;
    }
  }

  console.log(count, chunk);
  return chunk.reverse().map((c) => chunkMap[c]);
}

function getPoints(complete) {
  return complete.reduce((a, c) => {
    a *= 5;
    a += points2[c];
    console.log(a, c, points2[c]);
    return a;
  }, 0);
}

const incompletes = removeCorrupted(lines);

console.log(incompletes);

const completes = incompletes.map((l) => findCompletion(l));

console.log(completes);

const sorted = completes.map((c) => getPoints(c)).sort((a, b) => a - b);

console.log(sorted, sorted[(sorted.length / 2) >> 0]);
