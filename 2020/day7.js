const fs = require("fs");
const data = fs.readFileSync("./day7.txt", "utf8").split("\n");

function parseRules(d) {
  return d
    .filter((l) => l)
    .map((l) => {
      const splitRule = l.replace(/\./g, "").split(" contain ");

      const rule = {
        [splitRule[0]]: splitRule[1],
      };

      return rule;
    });
}

function getDirectContainer(rules, container) {
  const directs = rules.filter((r) => {
    // console.log(...Object.values(r));
    return Object.values(r).filter((v) => v.includes(container)).length > 0;
  });

  return directs;
}

function part1(d) {
  const rules = parseRules(d);

  // console.log(rules);

  // console.log(getDirectContainer(rules, "shiny gold bags"));
  // totalBagTypes.push(...getDirectContainer(rules, "shiny gold bags").map((o) => Object.keys(o).join()));

  let totalBagTypes = [];
  let bags = ["shiny gold bag"];

  while (bags.length > 0) {
    let newBags = [];

    bags.forEach((b) => {
      newBags = [
        ...newBags,
        ...getDirectContainer(rules, b).map((o) =>
          Object.keys(o)
            .map((k) => k.replace(" bags", ""))
            .join()
        ),
      ];
    });

    if (newBags.length) {
      totalBagTypes = [...totalBagTypes, ...newBags];
    }

    bags = newBags;
    console.log(bags);
  }

  const uniqueBagsTypes = Array.from(new Set(totalBagTypes));

  console.log("UNIQUES", uniqueBagsTypes, uniqueBagsTypes.length);
}

// part1(data);

function parseRules2(d) {
  const rules = d
    .filter((l) => l)
    .map((l) => {
      const splitRule = l
        .replace(/bag(s*)( *)/, "")
        .replace(/\./g, "")
        .split(" contain ");

      const rule = {
        [splitRule[0]]: splitRule[1]
          .split(", ")
          .map((b) => b.replace(/ bag(s*)/g, ""))
          .filter((r) => r != "no other")
          .map((r) => {
            return {
              count: parseInt(r),
              bagtype: r.slice(2),
            };
          }),
      };

      return rule;
    });

  return Object.fromEntries(rules.map((r) => [Object.keys(r)[0], Object.values(r)[0]]));
}

function getBagTotal(rule) {
  return rule.map((r) => r.count).reduce((a, b) => a + b, 0);
}

function getCount(rules, bagtype, bagcount = 0) {
  if (rules[bagtype] && rules[bagtype].length) {
    rules[bagtype].forEach((b) => {
      bagcount += b.count * getCount(rules, b.bagtype);
      bagcount += b.count;
      console.log(`${bagtype} holds ${b.count} ${b.bagtype} (${b.count * getCount(rules, b.bagtype)}), for a total of ${bagcount}`);
    });
  } else {
    console.log(`${bagtype} holds none`);
    return 0;
  }

  return bagcount;
}

function part2(d) {
  const rules = parseRules2(d);

  console.log(JSON.stringify(rules));

  console.log(getCount(rules, "shiny gold"));
}

const otherData = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`.split("\n");

part2(otherData);
// part2(data);
