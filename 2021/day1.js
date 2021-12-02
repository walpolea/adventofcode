const fs = require("fs");
const data = fs
  .readFileSync("./day1.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => parseInt(l));

console.log(data);

///PART 1
const { totalIncreases } = data.reduce((prev, cur) => {
  if (prev.lastValue) {
    prev.totalIncreases += cur > prev.lastValue ? 1 : 0;
  } else {
    prev.totalIncreases = 0;
  }
  prev.lastValue = cur;

  return prev;
}, {});

console.log(totalIncreases);
//////////

///PART 2
const { totalSumIncreases } = data.reduce((prev, cur, i) => {
  if (i + 2 < data.length) {
    const curSum = cur + data[i + 1] + data[i + 2];

    if (prev.lastValue) {
      prev.totalSumIncreases += curSum > prev.lastValue ? 1 : 0;
    } else {
      prev.totalSumIncreases = 0;
    }
    prev.lastValue = curSum;
  }

  return prev;
}, {});

console.log(totalSumIncreases);
