const fs = require("fs");
const data = fs
  .readFileSync("./day1.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => parseInt(l));

console.log(data);

let gotIt = false;

find2020 = (d) => {
  for (let i = 0; i < d.length; i++) {
    const cur = d[i];

    for (let j = 1; j < d.length; j++) {
      const next = d[j];

      if (2020 === cur + next) {
        return [i, j, cur, next, cur * next];
      }
    }
  }
  return undefined;
};

find2020Three = (d) => {
  for (let i = 0; i < d.length; i++) {
    const cur = d[i];

    for (let j = 1; j < d.length; j++) {
      const next = d[j];

      for (let k = 2; k < d.length; k++) {
        const final = d[k];
        if (2020 === cur + next + final) {
          return [i, j, k, cur, next, final, cur * next * final];
        }
      }
    }
  }
  return undefined;
};

console.log(find2020(data));
console.log(find2020Three(data));
