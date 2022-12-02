const fs = require("fs");
const data = fs
  .readFileSync("./day11.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

const rows = [...data];

console.log(rows);

const rowLength = rows.length;
const colLength = rows[0].length;

function makeGrid(rows) {
  return Object.fromEntries(
    rows
      .map((r, i) => {
        const cols = r.split("").map((c) => parseInt(c));
        return cols.map((c, j) => {
          return [`${j}-${i}`, c];
        });
      })
      .flat()
  );
}

function keyToCoord(key) {
  const [x, y] = key.split("-").map((c) => parseInt(c));
  return { x, y };
}

function coordToKey({ x, y }) {
  if (x === undefined && y === undefined) return undefined;

  return `${x}-${y}`;
}

function getWest({ x, y }) {
  return x > 0 ? { x: x - 1, y: y } : { x: undefined, y: undefined };
}

function getNorth({ x, y }) {
  return y > 0 ? { x: x, y: y - 1 } : { x: undefined, y: undefined };
}

function getEast({ x, y }) {
  return x < colLength - 1 ? { x: x + 1, y: y } : { x: undefined, y: undefined };
}

function getSouth({ x, y }) {
  return y < rowLength - 1 ? { x: x, y: y + 1 } : { x: undefined, y: undefined };
}

function getNorthWest({ x, y }) {
  return x > 0 && y > 0 ? { x: x - 1, y: y - 1 } : { x: undefined, y: undefined };
}

function getNorthEast({ x, y }) {
  return x < colLength - 1 && y > 0 ? { x: x + 1, y: y - 1 } : { x: undefined, y: undefined };
}

function getSouthWest({ x, y }) {
  return x > 0 && y < rowLength - 1 ? { x: x - 1, y: y + 1 } : { x: undefined, y: undefined };
}

function getSouthEast({ x, y }) {
  return x < colLength - 1 && y < rowLength - 1 ? { x: x + 1, y: y + 1 } : { x: undefined, y: undefined };
}

function getNeighbors({ x, y }) {
  return [
    coordToKey(getWest({ x, y })),
    coordToKey(getNorth({ x, y })),
    coordToKey(getEast({ x, y })),
    coordToKey(getSouth({ x, y })),
    coordToKey(getNorthWest({ x, y })),
    coordToKey(getNorthEast({ x, y })),
    coordToKey(getSouthWest({ x, y })),
    coordToKey(getSouthEast({ x, y })),
  ].filter((v) => v !== undefined);
}

const grid = makeGrid(rows);

// console.log(grid);

function run(grid, steps) {
  let flashTotal = 0;
  for (let i = 0; i < steps; i++) {
    for (let [key] of Object.entries(grid)) {
      grid[key]++;
    }

    const flashes = [];

    const flash = (key) => {
      grid[key] = 0;
      flashes.push(key);
      flashTotal++;

      const coord = keyToCoord(key);
      const neighbors = getNeighbors(coord).filter((n) => !flashes.includes(n));

      neighbors.forEach((k) => {
        grid[k]++;
      });

      neighbors
        .filter((k) => grid[k] > 9)
        .forEach((n) => {
          if (!flashes.includes(n)) {
            flash(n);
          }
        });
    };

    for (let [key] of Object.entries(grid)) {
      if (grid[key] > 9 && !flashes.includes(key)) {
        flash(key);
      }
    }

    const allFlashed = (grid) => {
      return !Object.values(grid).filter((v) => v > 0).length > 0;
    };

    if (allFlashed(grid)) {
      console.log(i + 1, flashTotal);
      displayGrid(grid);
    }
  }
}

function displayGrid(grid) {
  console.log("\n");
  const vals = Object.values(grid);

  let row = [];
  vals.forEach((v, i) => {
    row.push(v);
    if ((i + 1) % 10 === 0 && i !== 0) {
      console.log(row.join(""));
      row = [];
    }
  });
}

run(grid, 1000);
