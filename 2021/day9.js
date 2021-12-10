const fs = require("fs");
const data = fs
  .readFileSync("./day9.txt", "utf8")
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
  // if (!key) return undefined;
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

function getNeighbors({ x, y }) {
  return [
    grid[coordToKey(getWest({ x, y }))],
    grid[coordToKey(getNorth({ x, y }))],
    grid[coordToKey(getEast({ x, y }))],
    grid[coordToKey(getSouth({ x, y }))],
  ].filter((v) => v !== undefined);
}

const grid = makeGrid(rows);

function checkLow(key) {
  const { x, y } = keyToCoord(key);
  const current = grid[key];

  const n = getNeighbors({ x, y });

  let isLow = true;
  n.forEach((v) => {
    if (v <= current) {
      isLow = false;
    }
  });

  return isLow;
}

const lows = [];

for (let r = 0; r < rowLength; r++) {
  for (let c = 0; c < colLength; c++) {
    const key = coordToKey({ x: c, y: r });
    if (checkLow(key)) {
      lows.push({ coord: { x: c, y: r }, key, value: grid[key] });
    }
  }
}

const sum = lows.reduce((a, c) => a + (c.value + 1), 0);

console.log(lows, lows.length, sum);

function getNeighbors2({ x, y }) {
  return [
    { coord: getWest({ x, y }), key: coordToKey(getWest({ x, y })), value: grid[coordToKey(getWest({ x, y }))] },
    { coord: getNorth({ x, y }), key: coordToKey(getNorth({ x, y })), value: grid[coordToKey(getNorth({ x, y }))] },
    { coord: getEast({ x, y }), key: coordToKey(getEast({ x, y })), value: grid[coordToKey(getEast({ x, y }))] },
    { coord: getSouth({ x, y }), key: coordToKey(getSouth({ x, y })), value: grid[coordToKey(getSouth({ x, y }))] },
  ].filter((v) => v !== undefined);
}

function checkIsInBasin(low, basin) {
  return basin.map((b) => b.key).includes(low.key);
}

function findBasin(low, basin = []) {
  basin = [...basin, low];
  const neighbors = getNeighbors2(low.coord).filter((n) => n.value < 9);

  neighbors.forEach((n) => {
    if (!checkIsInBasin(n, basin)) basin = findBasin(n, basin);
  });

  return basin;
}

const basins = [];
lows.forEach((l) => {
  basins.push(findBasin(l));
});

basins.sort((a, b) => b.length - a.length);
const basinLengths = basins.map((b) => b.length);
console.log(basinLengths, basinLengths[0], basinLengths[1], basinLengths[2], basinLengths[0] * basinLengths[1] * basinLengths[2]);
