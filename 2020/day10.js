const fs = require("fs");
const { getMaxListeners } = require("process");
const data = fs
  .readFileSync("./day10.txt", "utf8")
  .split("\n")
  .filter((l) => l)
  .map((l) => parseInt(l));

const otherData = `16
10
15
5
1
11
7
19
6
12
4`
  .split("\n")
  .filter((l) => l)
  .map((l) => parseInt(l));

const otherData2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`
  .split("\n")
  .filter((l) => l)
  .map((l) => parseInt(l));

function getHighest(arr) {
  return arr.reduce((a, c) => {
    return a > c ? a : c;
  });
}

function getLowest(arr) {
  if (!arr.length) return 0;

  return arr.reduce((a, c) => {
    return a < c ? a : c;
  });
}

function getWIthin3(arr, target) {
  const max = target + 3;

  return arr.filter((j) => {
    return j > target && j <= max;
  });
}

function getDiff(last, cur) {
  return cur - last;
}

function countInstances(arr, num) {
  return arr.filter((j) => j === num).length;
}

const diffs = [];
const chain = [0];

function part1(d) {
  const phoneJoltage = getHighest(d) + 3;
  diffs.push(3);

  const adapters = [...d].sort((a, b) => a - b);

  while (adapters.length) {
    const next = getLowest(getWIthin3(adapters, chain[chain.length - 1]));

    if (next === 0) {
      break;
    }

    console.log(chain[chain.length - 1], next, getDiff(chain[chain.length - 1], next));

    adapters.splice(adapters.indexOf(next), 1);

    if (chain.length < 2) {
      diffs.push(getDiff(0, next));
    } else {
      diffs.push(getDiff(chain[chain.length - 1], next));
    }

    chain.push(next);
  }

  console.log(getHighest(d), phoneJoltage);

  // console.log(chain, diffs);

  console.log(countInstances(diffs, 1), countInstances(diffs, 3), countInstances(diffs, 1) * countInstances(diffs, 3));
}

function countChains(arr) {
  const sum = arr.reduce((a, c) => {
    return a + c;
  });

  return sum + 1;
}

function part2(d) {
  const phoneJoltage = getHighest(d) + 3;
  diffs.push(3);

  const lengths = [];

  const adapters = [...d].sort((a, b) => a - b);
  let pcount = 0;

  while (adapters.length) {
    const possibilities = getWIthin3(adapters, chain[chain.length - 1]);
    const next = getLowest(possibilities);

    console.log(possibilities, next);

    if (next === 0) {
      break;
    }

    adapters.splice(adapters.indexOf(next), 1);

    lengths.push(possibilities.length);
    if (possibilities.length > 1) {
      pcount++;
    }

    // possibilities.forEach((j) => {
    //   adapters.splice(adapters.indexOf(j), 1);
    // });

    if (chain.length < 2) {
      diffs.push(getDiff(0, next));
    } else {
      diffs.push(getDiff(chain[chain.length - 1], next));
    }

    chain.push(next);
  }

  console.log(lengths);

  let total = 1;
  for (var i = 0; i < lengths.length; i++) {
    total = total + Math.pow(2, lengths[i]);
  }
  console.log(total);

  console.log(Math.pow());

  // console.log(chain, diffs);

  //console.log(countInstances(diffs, 1), countInstances(diffs, 3), countInstances(diffs, 1) * countInstances(diffs, 3));

  // console.log(countInstances(diffs, 1));
}

//part2(data);
part2(otherData);
//part2(otherData2);
