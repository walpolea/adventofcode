const fs = require("fs");
const data = fs
  .readFileSync("./day3.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

console.log(data);

const part1 = (d) => {
  let curH = 0;
  let curV = 0;
  let spaceCount = 0;
  let treeCount = 0;
  let intervalH = 3;
  let intervalV = 1;

  while (curV < d.length) {
    if (d[curV][curH] === "#") {
      treeCount++;
    } else if (d[curV][curH] === ".") {
      spaceCount++;
    }

    console.log(curV, curH, d[curV].length, d[curV][curH] === "#");

    curH += intervalH;
    curH = curH % d[curV].length;
    curV += intervalV;
  }

  return { spaceCount, treeCount };
};

console.log(part1(data));

const getTrees = (d, h, v) => {
  let curH = 0;
  let curV = 0;
  let spaceCount = 0;
  let treeCount = 0;
  let intervalH = h;
  let intervalV = v;

  while (curV < d.length) {
    if (d[curV][curH] === "#") {
      treeCount++;
    } else if (d[curV][curH] === ".") {
      spaceCount++;
    }

    console.log(curV, curH, d[curV].length, d[curV][curH] === "#");

    curH += intervalH;
    curH = curH % d[curV].length;
    curV += intervalV;
  }

  return { spaceCount, treeCount };
};

const part2 = () => {
  return [getTrees(data, 1, 1), getTrees(data, 3, 1), getTrees(data, 5, 1), getTrees(data, 7, 1), getTrees(data, 1, 2)];
};

const part2Data = part2(data);

console.log(
  part2Data,
  part2Data.map((d) => d.treeCount).reduce((acc, cur) => acc * cur)
);
