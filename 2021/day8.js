const fs = require("fs");
const data = fs
  .readFileSync("./day8.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");
// .map((l) => parseInt(l));

console.log(data);

function parsePattern(p) {
  let [input, output] = p.split(" | ");
  input = input.split(" ");
  output = output.split(" ");

  return {
    input,
    output,
  };
}

function countUniques(patterns) {
  let sum = 0;
  patterns
    .map((p) => p.output)
    .forEach((o) => {
      sum += o.filter((d) => [2, 3, 4, 7].includes(d.length)).length;
    });
  return sum;
}

//2,3,4,7
const patterns = [...data].map((p) => parsePattern(p));

console.log(patterns);

console.log(countUniques(patterns));

function aLittleDeduction(input) {
  const one = input.filter((p) => p.length === 2)[0].split("");
  const seven = input.filter((p) => p.length === 3)[0].split("");
  const four = input.filter((p) => p.length === 4)[0].split("");
  const eight = input.filter((p) => p.length === 7)[0].split("");

  const seg1 = seven.filter((d) => !one.includes(d))[0];

  const zeroOrSixOrNine = input.filter((p) => p.length === 6).map((p) => p.split(""));
  const twoOr3Or5 = input.filter((p) => p.length === 5).map((p) => p.split(""));

  const six = zeroOrSixOrNine.filter((p) => {
    let matchCount = 0;
    one.forEach((d) => {
      if (p.includes(d)) {
        matchCount++;
      }
    });

    return matchCount === 1;
  })[0];

  const zeroOrNine = zeroOrSixOrNine.filter((p) => p !== six);

  const nine = zeroOrNine.filter((p) => {
    let matchCount = 0;
    four.forEach((d) => {
      if (p.includes(d)) {
        matchCount++;
      }
    });

    return matchCount === 4;
  })[0];

  const zero = zeroOrNine.filter((p) => p !== nine)[0];
  const seg4 = eight.filter((d) => !zero.includes(d))[0];
  const seg3 = one.filter((d) => !six.includes(d))[0];
  const seg6 = one.filter((d) => d !== seg3)[0];

  const seg5 = eight.filter((d) => !nine.includes(d))[0];

  const three = twoOr3Or5.filter((p) => p.includes(seg3) && p.includes(seg6))[0];
  const twoOr5 = twoOr3Or5.filter((p) => p !== three);

  const five = twoOr5.filter((p) => p.includes(seg6))[0];
  const two = twoOr5.filter((p) => !p.includes(seg6))[0];

  const seg7 = two.filter((d) => ![seg1, seg3, seg4, seg5].includes(d))[0];
  const seg2 = eight.filter((d) => ![seg1, seg3, seg4, seg5, seg6, seg7].includes(d))[0];

  const segDef = {
    seg1,
    seg2,
    seg3,
    seg4,
    seg5,
    seg6,
    seg7,
  };

  return {
    [zero.sort().join("")]: "0",
    [one.sort().join("")]: "1",
    [two.sort().join("")]: "2",
    [three.sort().join("")]: "3",
    [four.sort().join("")]: "4",
    [five.sort().join("")]: "5",
    [six.sort().join("")]: "6",
    [seven.sort().join("")]: "7",
    [eight.sort().join("")]: "8",
    [nine.sort().join("")]: "9",
  };
}

function calculateOutput(output, def) {
  output = output.map((o) => o.split("").sort().join(""));
  return parseInt(output.map((o) => def[o]).join(""));
}

function run() {
  let sum = 0;

  patterns.forEach((pattern) => {
    const def = aLittleDeduction(pattern.input);
    console.log(def);
    sum += calculateOutput(pattern.output, def);
  });

  console.log(sum);
}

run();
