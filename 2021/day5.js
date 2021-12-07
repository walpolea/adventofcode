const fs = require("fs");
const data = fs
  .readFileSync("./day5.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");
// .map((l) => parseInt(l));

function parseLines(lines) {
  return lines.map((l) => {
    const [start, end] = l.split(" -> ").map((c) => {
      const [x, y] = c.split(",").map((p) => parseInt(p));
      return { x, y };
    });
    return {
      start,
      end,
    };
  });
}

function filterStraightLines(lines) {
  return lines.filter((l) => l.start.x === l.end.x || l.start.y === l.end.y);
}

function coordCount(lines) {
  const counts = {};

  lines.forEach((l) => {
    let s, e;

    console.log(l);

    if (l.start.x === l.end.x) {
      s = l.start.y;
      e = l.end.y;

      if (s > e) {
        [s, e] = [e, s];
      }

      for (let i = s; i <= e; i++) {
        const key = `${l.start.x}-${i}`;
        counts[key] = counts[key] ?? 0;
        counts[key] = ++counts[key];
      }
    } else if (l.start.y === l.end.y) {
      s = l.start.x;
      e = l.end.x;

      if (s > e) {
        [s, e] = [e, s];
      }

      for (let i = s; i <= e; i++) {
        const key = `${i}-${l.start.y}`;

        counts[key] = counts[key] ?? 0;
        counts[key] = ++counts[key];
      }
    } else {
      let sx, sy, ex, ey;
      sx = l.start.x;
      ex = l.end.x;
      sy = l.start.y;
      ey = l.end.y;

      let i = sx;
      let j = sy;

      let d = Math.abs(ex - sx);
      for (let k = 0; k <= d; k++) {
        const key = `${i}-${j}`;

        counts[key] = counts[key] ?? 0;
        counts[key] = ++counts[key];
        if (sx > ex) {
          i--;
        } else {
          i++;
        }

        if (sy > ey) {
          j--;
        } else {
          j++;
        }
      }
    }
  });

  return counts;
}

function filterOverlaps(counts) {
  return Object.entries(counts).filter(([k, v]) => {
    return v > 1;
  });
}

const lines = parseLines(data);
// const straightLines = filterStraightLines(lines);
// const counts = coordCount(straightLines);
// const fcounts = filterOverlaps(counts);
// console.log(fcounts, fcounts.length);

const counts = coordCount(lines);

const fcounts = filterOverlaps(counts);

console.log(counts, fcounts, fcounts.length);
