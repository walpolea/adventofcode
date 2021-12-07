const fs = require("fs");
const data = fs
  .readFileSync("./day7.txt", "utf8")
  .split(",")
  .filter((l) => l !== "")
  .map((l) => parseInt(l));

console.log(data);

const positions = [...data];

function getFuelCost(p, dest) {
  //part 1
  // return Math.abs(dest - p);

  //part 2
  const d = Math.abs(dest - p);
  return [...Array(d + 1).keys()].reduce((a, c) => a + c);
}

function calculateFuel(pos, dest) {
  let fuel = 0;

  pos.forEach((p) => {
    const cost = getFuelCost(p, dest);
    fuel += cost;
  });

  return fuel;
}

function run() {
  let lowestFuel = undefined;
  let lowestPosition = undefined;
  const tried = [];

  positions.forEach((p) => {
    if (!tried.includes(p)) {
      const fuel = calculateFuel(positions, p);
      // console.log(fuel);

      if (lowestFuel === undefined) {
        lowestFuel = fuel;
      }

      if (lowestFuel > fuel) {
        lowestFuel = fuel;
        lowestPosition = p;
      }
      tried.push(p);
    }
  });

  console.log(lowestPosition, lowestFuel);
}

run();
