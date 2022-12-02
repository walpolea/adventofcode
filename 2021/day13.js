const fs = require("fs");
let [coords, folds] = fs
  .readFileSync("./day13.txt", "utf8")
  .split("\n\n")
  .filter((l) => l !== "");

coords = coords
  .split("\n")
  .map((c) => c.split(",").map((c) => parseInt(c)))
  .map(([x, y]) => {
    return {
      x,
      y,
    };
  });
folds = folds
  .split("\n")
  .map((f) => f.trim().slice(11).split("="))
  .map(([axis, num]) => {
    return {
      axis: axis,
      coord: parseInt(num),
    };
  });

console.log({ coords }, { folds });

function fold({ axis, coord }, coords) {
  let newCoords = [...coords];
  const keys = Object.fromEntries(newCoords.map(({ x, y }) => [`${x}-${y}`, true]));
  newCoords = newCoords
    .map((c) => {
      if (c[axis] > coord) {
        const diff = c[axis] - coord;
        c[axis] = coord - diff;

        if (c[axis] < 0 || keys[`${c.x}-${c.y}`]) {
          return undefined;
        }
      }
      return c;
    })
    .filter((c) => c);

  return newCoords;
}
// part 1

const newCoords = fold(folds[0], [...coords]);
console.log(newCoords, newCoords.length);

//part 2

let c = [...coords];
for (let i = 0; i < folds.length; i++) {
  const f = folds[i];
  c = fold(f, c);
}

c.sort((a, b) => a.x - b.x);
console.log(c);

const keys = Object.fromEntries(c.map(({ x, y }) => [`${x}-${y}`, true]));

for (let y = 0; y < 10; y++) {
  let ln = "";
  for (let x = 0; x < 40; x++) {
    if (keys[`${x}-${y}`]) {
      ln += "# ";
    } else {
      ln += "  ";
    }
  }
  console.log(ln);
}
