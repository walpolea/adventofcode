const fs = require("fs");
const data = fs
  .readFileSync("./day6.txt", "utf8")
  .split(",")
  .filter((l) => l !== "")
  .map((l) => parseInt(l));

let fish = [...data];

console.log(fish);

function processDay(fish) {
  const fishTotal = fish.length;
  for (let i = 0; i < fishTotal; i++) {
    let f = fish[i];
    f -= 1;

    if (f < 0) {
      f = 6;
      fish.push(8);
    }

    fish[i] = f;
  }

  return fish;
}

const days = 80;

for (let i = 0; i < days; i++) {
  fish = processDay(fish);
}
console.log(fish.length);

////PART 2

function reduceFish(fish) {
  return {
    f8: sumFish(fish, 8),
    f7: sumFish(fish, 7),
    f6: sumFish(fish, 6),
    f5: sumFish(fish, 5),
    f4: sumFish(fish, 4),
    f3: sumFish(fish, 3),
    f2: sumFish(fish, 2),
    f1: sumFish(fish, 1),
    f0: sumFish(fish, 0),
  };
}

function sumFish(fish, place) {
  return fish.filter((f) => f === place).reduce((acc, cur) => acc + 1, 0);
}

function totalFish(fish) {
  return Object.values(fish).reduce((acc, cur) => acc + cur, 0);
}

function processDay2(fish) {
  const spawned = fish["f0"];

  const newFish = {
    f8: spawned,
    f7: fish["f8"],
    f6: fish["f0"] + fish["f7"],
    f5: fish["f6"],
    f4: fish["f5"],
    f3: fish["f4"],
    f2: fish["f3"],
    f1: fish["f2"],
    f0: fish["f1"],
  };

  console.log(newFish);

  return newFish;
}

fish = reduceFish(fish);
console.log(fish);
const days2 = 256;

for (let j = 0; j < days2; j++) {
  fish = processDay2(fish);
}

console.log(fish, totalFish(fish));
