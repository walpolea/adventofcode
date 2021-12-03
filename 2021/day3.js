const fs = require("fs");
const data = fs
  .readFileSync("./day3.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

// console.log(data);

function toBinary(binaryString) {
  return parseInt(binaryString, 2);
}

////// Part 1

const bitlen = data[0].length;

function calculateGamma() {
  let gamma = [];

  for (let i = 0; i < bitlen; i++) {
    let zeros = 0;
    let ones = 0;

    data.forEach((b) => {
      if (b[i] === "0") {
        zeros++;
      } else {
        ones++;
      }
    });

    gammaVal = zeros > ones ? "0" : "1";
    gamma.push(gammaVal);
  }

  return gamma.join("");
}

function calculateEpsilon(gamma) {
  return gamma
    .split("")
    .map((b) => (b === "0" ? "1" : "0"))
    .join("");
}

let g = calculateGamma();
let e = calculateEpsilon(g);

console.log(g, e, toBinary(g), toBinary(e), toBinary(g) * toBinary(e));

/////// Part 2

function OGRCriteria(pos, d) {
  let zeros = 0;
  let ones = 0;

  d.forEach((b) => {
    if (b[pos] === "0") {
      zeros++;
    } else {
      ones++;
    }
  });

  return zeros > ones ? "0" : "1";
}

function CSRCriteria(pos, d) {
  let zeros = 0;
  let ones = 0;

  d.forEach((b) => {
    if (b[pos] === "0") {
      zeros++;
    } else {
      ones++;
    }
  });

  return zeros <= ones ? "0" : "1";
}

function filterOutByBit(bit, pos, d) {
  return d.filter((b) => b[pos] === bit);
}

function applyCriteria(criteria) {
  let filteredData = [...data];
  for (let i = 0; i < bitlen; i++) {
    filteredData = filterOutByBit(criteria(i, filteredData), i, filteredData);

    if (filteredData.length === 1) {
      return filteredData[0];
    }
  }
}

const o2 = applyCriteria(OGRCriteria);
const co2 = applyCriteria(CSRCriteria);

console.log(o2, co2, toBinary(o2), toBinary(co2), toBinary(o2) * toBinary(co2));
