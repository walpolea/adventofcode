const fs = require("fs");
const data = fs
  .readFileSync("./day15.txt", "utf8")
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
function getNeighbors({ x, y }) {
  return [coordToKey(getEast({ x, y })), coordToKey(getSouth({ x, y })), coordToKey(getWest({ x, y })), coordToKey(getNorth({ x, y }))].filter(
    (v) => v !== undefined
  );
}

function createGraph(grid) {
  return Object.fromEntries(
    Object.entries(grid).map(([coord, value]) => {
      let neighbors = getNeighbors(keyToCoord(coord));
      const neighborObject = Object.fromEntries(neighbors.map((n) => [n, grid[n]]));
      return [coord, neighborObject];
    })
  );
}

function shortestDistanceNode(distances, visited) {
  let shortest = null;

  for (let node in distances) {
    let currentIsShortest = shortest ?? distances[node] < distances[shortest];

    if (currentIsShortest && !visited.includes(node)) {
      shortest = node;
    }
  }
  return shortest;
}

function run() {
  const grid = makeGrid(rows);
  const graph = createGraph(grid);

  console.log(grid);

  const start = "0-0";
  const end = `${colLength - 1}-${rowLength - 1}`;

  let distances = {};
  distances[end] = "Infinity";
  distances = { ...distances, ...graph[start] };

  let parents = { end: null };
  for (let child in graph[start]) {
    parents[child] = start;
  }

  // collect visited nodes
  let visited = [];

  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];

    // for each of those child nodes:
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(start)) {
        continue;
      } else {
        // save the distance from start node to child node
        let newdistance = distance + children[child];
        // if there’s no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [end];
  let parent = parents[end];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  let results = {
    distance: distances[end],
    path: shortestPath,
  };

  console.log(results);
}

run();

// function sumPath(path) {
//   return path.map((c) => c.risk).reduce((a, c) => a + c);
// }

// function allPaths(dirs, p = "", depth) {
//   paths = [];
//   if (depth == 0) {
//     paths.push(p);
//     return paths;
//   }

//   for (let i = 0; i < dirs.length; i++) {
//     const d = dirs[i];
//     const newp = p + d;
//     paths = [...paths, ...allPaths(dirs, newp, depth - 1)];
//   }
//   return paths;
// }

// function getNextMoveValues(coord, depth = 3) {
//   const { x, y } = keyToCoord(coord);
//   if (x + depth > colLength || y + depth > rowLength) {
//     return undefined;
//   }

//   let paths = Object.fromEntries(allPaths(["E", "S",], "", depth).map((k) => [k, 0]));
//   paths = Object.fromEntries(
//     Object.entries(paths)
//       .map(([k, v]) => {
//         let dead = false;
//         let total = 0;
//         let c = coord;
//         k.split("")
//           .map((m) => (m === "E" ? 0 : 1))
//           .forEach((m) => {
//             if (!dead) {
//               c = getNeighbors(keyToCoord(c))[m];

//               if (!c) {
//                 dead = true;
//               } else {
//                 total += grid[c];
//               }
//             }
//           });
//         return dead ? undefined : [k, total];
//       })
//       .filter((p) => p)
//       .sort((a, b) => a[1] - b[1])
//   );

//   return Object.entries(paths)[0];
// }

// function mapToCoord(start, map) {
//   let end = keyToCoord(start);
//   map.split("").map((d) => {
//     switch (d) {
//       case "E":
//         end.x++;
//         break;
//       case "S":
//         end.y++;
//         break;
//     }
//   });
//   return coordToKey(end);
// }

// const grid = makeGrid(rows);

// // console.log(grid);

// function run() {
//   const start = "0-0";
//   let cur = start;
//   const path = [];

//   // let total = 0;
//   // let newTotal = 0;
//   // while (cur !== `${colLength - 1}-${rowLength - 1}`) {
//   //   const p = getNextMoveValues(cur, 2);
//   //   cur = mapToCoord(cur, p[0]);
//   //   newTotal = p[1];
//   //   total += newTotal;
//   //   console.log(cur, total);
//   // }

//   // console.log(cur, total);

//   while (cur !== `${colLength - 1}-${rowLength - 1}`) {
//     let p = undefined;
//     let d = 18;
//     while (!p && d > 1) {
//       p = getNextMoveValues(cur, d);
//       d--;
//     }

//     let nextGuess = null;
//     if (p) {
//       nextGuess = p[0][0];
//     } else {
//       nextGuess = null;
//     }
//     console.log(p);

//     const neighbors = getNeighbors(keyToCoord(cur));
//     let next;

//     if (nextGuess) {
//       if (nextGuess === "E") {
//         next = neighbors[0];
//       } else if (nextGuess && nextGuess === "S") {
//         next = neighbors[1];
//       }

//       // next = mapToCoord(cur, p[0]);
//       path.push({
//         coord: next,
//         risk: grid[next],
//       });

//       cur = next;
//     } else {
//       neighbors.sort((a, b) => grid[a] - grid[b]);

//       next = neighbors[0];

//       if (grid[neighbors[0]] === grid[neighbors[1]]) {
//         const n0 = getNeighbors(keyToCoord(neighbors[0])).sort((a, b) => grid[a] - grid[b])[0];
//         const n1 = getNeighbors(keyToCoord(neighbors[1])).sort((a, b) => grid[a] - grid[b])[0];

//         if (grid[n0] > grid[n1]) {
//           next = neighbors[1];
//         } else {
//           next = neighbors[0];
//         }
//       }

//       path.push({
//         coord: next,
//         risk: grid[next],
//       });

//       cur = next;
//     }

//     console.log(next);
//   }

//   console.log(path, sumPath(path));
// }

// run();

// console.log(allPaths(["E", "S"], "", 2));
