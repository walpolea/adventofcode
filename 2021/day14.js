const fs = require("fs");
let [template, rules] = fs
  .readFileSync("./day14.txt", "utf8")
  .split("\n\n")
  .filter((l) => l !== "");

rules = Object.fromEntries(rules.split("\n").map((r) => r.split(" -> ")));

console.log({ template, rules });

function applyRules(polymer, rules) {
  let pairs = [];
  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];
    pairs.push(pair);
  }

  pairs = pairs.map((p) => p[0] + rules[p] + p[1]);

  polymer = pairs.reduce((poly, pair, i) => {
    if (i < pairs.length - 1) {
      poly += pair[0] + pair[1];
    } else {
      poly += pair;
    }
    return poly;
  }, "");

  // console.log(polymer);
  return polymer;
}

function run() {
  let polymer = template;
  for (let i = 0; i < 10; i++) {
    polymer = applyRules(polymer, rules);
  }

  const counts = polymer.split("").reduce((count, l) => {
    count[l] = count[l] ? count[l] + 1 : 1;
    return count;
  }, {});

  const sortedCounts = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  const [lowest, highest] = [sortedCounts[0], sortedCounts[sortedCounts.length - 1]];
  console.log(lowest, highest, highest[1] - lowest[1]);
}

// run();

function mapPair(pair, rules) {
  return [pair[0] + rules[pair], rules[pair] + pair[1]];
}

function getInitialPairs(template) {
  let pairs = [];
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    pairs.push(pair);
  }
  return pairs;
}

// let pairRules = {};

function createPairsMap(pairs, rules) {
  const pairRules = {};
  pairs.forEach((p) => {
    if (!pairRules[p]) {
      const newPairs = mapPair(p, rules);
      pairRules[p] = newPairs;
    }
  });
  return pairRules;
}

function getNewPairCount(count, pairRules, rules) {
  const newCount = Object.fromEntries(
    Object.keys(rules).map((k) => {
      return [k, 0];
    })
  );

  Object.entries(count).forEach(([pair, num]) => {
    if (num > 0) {
      const newPairs = pairRules[pair];
      newPairs.forEach((p) => (newCount[p] += num));
    }
  });
  return newCount;
}

function getTotals(counts) {
  const totals = {};

  Object.entries(counts).forEach(([pair, t]) => {
    const l = pair[0];
    if (!totals[l]) {
      totals[l] = 0;
    }

    totals[l] += t;
  });

  totals[template[template.length - 1]] += 1;

  console.log(totals);
  return totals;
}

function run2() {
  let pairCounts = Object.fromEntries(
    Object.keys(rules).map((k) => {
      return [k, 0];
    })
  );

  const pairRules = createPairsMap(Object.keys(rules), rules);

  const pairs = getInitialPairs(template);

  pairs.forEach((p) => {
    pairCounts[p]++;
  });

  console.log(pairRules, pairCounts);

  for (let i = 0; i < 40; i++) {
    pairCounts = getNewPairCount(pairCounts, pairRules, rules);
    console.log(pairCounts);
  }

  const counts = getTotals(pairCounts);

  const sortedCounts = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  const [lowest, highest] = [sortedCounts[0], sortedCounts[sortedCounts.length - 1]];
  console.log(lowest, highest, highest[1] - lowest[1]);
}

run2();
