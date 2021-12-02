const fs = require("fs");
const data = fs.readFileSync("./day6.txt", "utf8").split("\n");
// .filter((l) => l !== "");

function splitGroups(d) {
  return d
    .map((l) => {
      if (l === "") {
        return "&";
      } else {
        return l;
      }
    })
    .join()
    .split("&")
    .map((l) => Array.from(new Set(l.split(""))).filter((l) => l != ","));
}

function part1(d) {
  console.log(splitGroups(d));

  const groups = splitGroups(d);

  const groupTotals = groups.map((g) => {
    return g.length;
  });

  console.log(groupTotals);
  console.log(groupTotals.reduce((a, b) => a + b, 0));
}

function splitGroups2(d) {
  return d
    .map((l) => {
      if (l === "") {
        return "&";
      } else {
        return l;
      }
    })
    .join()
    .split("&")
    .map((l) => {
      return getIntersection(...l.split(",").filter((l) => l))
        .join()
        .replace(/\,/g, "");
    });
}

function part2(d) {
  const groups = splitGroups2(d);

  console.log(groups);

  const groupTotals = groups.map((g) => {
    return g.length;
  });

  console.log(groupTotals);
  console.log(groupTotals.reduce((a, b) => a + b, 0));
}

// part1(data);
part2(data);

function getUnion(...sets) {
  console.log("UNION", sets);
  let newSet = [];
  sets.forEach((set) => {
    newSet = [...newSet, ...set];
  });

  //remove duplicate, put in ascending order
  // newSet = Array.from(new Set(newSet)).sort((a, b) => a - b); //ascending sort

  return Array.from(new Set(newSet));
}

function getIntersection(...sets) {
  console.log(...sets);
  let newSet = getUnion(...sets);

  sets.forEach((set, index) => {
    newSet = [...newSet.filter((value) => -1 !== set.indexOf(value))];
  });

  return newSet;
}
