const fs = require("fs");
const data = fs
  .readFileSync("./day12.txt", "utf8")
  .split("\n")
  .filter((l) => l !== "");

const smalls = "abcdefghijklmnopqrstuvwxyz".split("");
const bigs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function isBig(con) {
  return bigs.includes(con.split("")[0]);
}

function isSmall(con) {
  return smalls.includes(con.split("")[0]);
}

const connections = [...data].map((c) => c.split("-"));

// console.log(connections);

const uniqueCaves = Array.from(new Set(connections.flat()));

// console.log(uniqueCaves);

const map = Object.fromEntries(
  uniqueCaves.map((c) => {
    return [
      c,
      Array.from(
        new Set(
          connections
            .filter((con) => con.includes(c))
            .flat()
            .filter((t) => t !== c)
        )
      ),
    ];
  })
);

console.log(map);

function travelMap(map) {
  const routes = [];

  const travelCave = (cave, route = ["start"]) => {
    route.push(cave);
    const nextRoutes = map[cave];

    for (let i = 0; i < nextRoutes.length; i++) {
      const c = nextRoutes[i];

      if (c === "end") {
        route.push("end");
        routes.push(route);
      } else if (route.includes(c) && isSmall(c)) {
        //thanks for playing
      } else if (c !== "start") {
        travelCave(c, [...route]);
      }
    }
  };

  const startRoutes = [...map["start"]];

  startRoutes.forEach((r) => {
    console.log("travel ", r, travelCave(r));
  });

  console.log("routes", routes, routes.length);
}

// travelMap(map);

////Part 2

function hasDuplicateSmall(route) {
  const r = [...route].filter((c) => isSmall(c));
  return r.length !== Array.from(new Set(r)).length;
}

function travelMap2(map) {
  map["end"] = [];
  const routes = [];

  const travelCave = (cave, route = ["start"]) => {
    route.push(cave);
    const nextRoutes = map[cave];

    for (let i = 0; i < nextRoutes.length; i++) {
      const r = [...route];
      const c = nextRoutes[i];
      if (c == "end") {
        r.push("end");
        routes.push(r);
        continue;
      } else if (isSmall(c) && hasDuplicateSmall(r) && r.includes(c)) {
        //thanks for playing
      } else if (c !== "start") {
        travelCave(c, [...r]);
      }
    }
  };

  const startRoutes = [...map["start"]];

  startRoutes.forEach((r) => {
    console.log("travel ", r, travelCave(r));
  });

  console.log("routes", routes.map((r) => r.join(",")).sort(), routes.length);
}

map["end"] = [];
travelMap2(map);
