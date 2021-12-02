const fs = require("fs");
const data = fs
  .readFileSync("./day5.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

const rows = [...Array(128).keys()];
const columns = [...Array(8).keys()];

function getLeftHalf(arr) {
  return arr.slice(0, Math.floor(arr.length / 2));
}

function getRightHalf(arr) {
  return arr.slice(Math.floor(arr.length / 2));
}

function reduceArray(arr, letters) {
  if (arr.length <= 1) {
    return arr;
  }

  if (letters[0] == "F" || letters[0] == "L") {
    arr = reduceArray(getLeftHalf(arr), letters.slice(1));
  } else if (letters[0] == "B" || letters[0] == "R") {
    arr = reduceArray(getRightHalf(arr), letters.slice(1));
  }

  return arr;
}

function getSeatID(row, col) {
  return row * 8 + col;
}

function part1(d) {
  const splitData = d.map((l) => {
    const arr = l.split("");
    return {
      rowData: arr.slice(0, 7),
      colData: arr.slice(7),
    };
  });

  let seatsFinal = [];

  const seatIDs = splitData.map((seat) => {
    const row = reduceArray(rows, seat.rowData)[0];
    const col = reduceArray(columns, seat.colData)[0];

    console.log({ row, col }, getSeatID(row, col));

    seatsFinal.push({ row, col, id: getSeatID(row, col) });

    return getSeatID(row, col);
  });

  seatIDs.sort((a, b) => b - a);

  console.log(seatIDs);

  for (var i = 1; i < seatIDs.length; i++) {
    if (seatIDs[i - 1] - seatIDs[i] === 2) {
      console.log("NOT FOUND", i, seatIDs[i] + 1);
    }
  }

  // const mySeat = Array.from(Array(seatIDs[0] - seatIDs[seatIDs.length - 1]), (_, i) => i + seatIDs[seatIDs.length - 1]).filter((i) => !seatIDs.includes(i));

  // console.log("MY SEAT", mySeat);

  // seatsFinal = Array.from(new Set(seatsFinal));
  // seatsFinal.sort((a, b) => a.row - b.row);

  // seatsFinal.forEach((s, i) => {
  //   if (s.row > 32 && s.row < 95) {
  //     console.log({ s });
  //   }
  // });

  // console.log(seatIDs);

  // const leftHalf = getLeftHalf(Array.from(new Set(seatIDs))).reverse();
  // const rightHalf = getRightHalf(Array.from(new Set(seatIDs)));

  // console.log(leftHalf, rightHalf);

  // for (var i = 1; i < leftHalf.length; i++) {
  //   if (leftHalf[i + 1] && leftHalf[i] + 1 !== leftHalf[i + 1] && leftHalf[i - 1] && leftHalf[i] - 1 !== leftHalf[i - 1]) {
  //     console.log("MISSING " + (leftHalf[i] + 1));
  //   }

  //   if (rightHalf[i + 1] && rightHalf[i] + 1 !== rightHalf[i + 1] && rightHalf[i - 1] && rightHalf[i] - 1 !== rightHalf[i - 1]) {
  //     console.log("MISSING " + (rightHalf[i] + 1));
  //   }
  // }
}

part1(data);
