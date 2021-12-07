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
  let sum = 0;
  for (let i = Math.abs(dest - p); i > 0; i--) {
    sum += i;
  }
  return sum;
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

      if (lowestFuel > fuel || lowestFuel === undefined) {
        lowestFuel = fuel;
        lowestPosition = p;
      }
      tried.push(p);
    }
  });

  console.log(lowestPosition, lowestFuel);
}

run();
