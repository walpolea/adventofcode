const fs = require("fs");
const data = fs
  .readFileSync("./day9.txt", "utf8")
  .split("\n")
  .filter((l) => l)
  .map((l) => parseInt(l));

function findPairSums(target, values) {
  const sums = [];

  for (var i = 0; i < values.length; i++) {
    for (var j = i + 1; j < values.length; j++) {
      if (values[i] + values[j] === target && values[i] !== values[j]) {
        sums.push({
          indexes: [i, j],
          values: [values[i], values[j]],
        });
      }
    }
  }

  return sums;
}

function part1(d) {
  let curindex = 25;

  for (var i = 25; i < d.length; i++) {
    if (!findPairSums(d[i], d.slice(i - 25, i)).length) {
      console.log("no pair sums for", i, d[i]);
    }
  }
}

//part1(data);

function sumMinMax(values) {
  console.log("summing", values);
  values.sort((a, b) => a - b);
  return values[0] + values[values.length - 1];
}

function part2(d) {
  const targetNum = 105950735;

  let rangeToTry = d.length;

  while (rangeToTry > 1) {
    console.log(rangeToTry);

    for (var i = 0; i + rangeToTry < d.length; i += rangeToTry) {
      let sum = 0;

      for (var j = i; j < i + rangeToTry; j++) {
        sum += d[j];

        if (sum === targetNum && i !== j) {
          console.log("got it", i, j, sumMinMax(d.slice(i, j + 1)));
        }
      }
    }
    rangeToTry--;
  }
}

part2(data);
