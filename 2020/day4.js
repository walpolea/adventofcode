const fs = require("fs");
const data = fs.readFileSync("./day4.txt", "utf8").split("\n");

console.log(data);

const part1 = (d) => {
  let passports = d.map((l) => {
    if (l !== "") {
      return " " + l;
    } else {
      return "X";
    }
  });

  passports = passports
    .join("")
    .split("X")
    .map((p) => {
      const pass = p.split(" ").filter((l) => l !== "");

      const pO = {};

      pass.forEach((c) => {
        const chr = c.split(":");
        pO[chr[0]] = chr[1];
      });

      return pO;
    });

  const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  let validCount = 0;
  let invalidCount = 0;

  let isValid = true;

  passports.forEach((p) => {
    fields.forEach((f) => {
      if (!p.hasOwnProperty(f)) {
        isValid = false;
      }
    });

    if (isValid) {
      validCount++;
    } else {
      invalidCount++;
    }

    isValid = true;
  });

  return { validCount, invalidCount };
};

console.log(part1(data));

const part2 = (d) => {
  let passports = d.map((l) => {
    if (l !== "") {
      return " " + l;
    } else {
      return "X";
    }
  });

  passports = passports
    .join("")
    .split("X")
    .map((p) => {
      const pass = p.split(" ").filter((l) => l !== "");

      const pO = {};

      pass.forEach((c) => {
        const chr = c.split(":");
        pO[chr[0]] = chr[1];
      });

      return pO;
    });

  const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const validators = {
    byr: (v) => {
      return v.length >= 4 && parseInt(v) >= 1920 && parseInt(v) <= 2002;
    },
    iyr: (v) => {
      return v.length >= 4 && parseInt(v) >= 2010 && parseInt(v) <= 2020;
    },
    eyr: (v) => {
      return v.length >= 4 && parseInt(v) >= 2020 && parseInt(v) <= 2030;
    },
    hgt: (v) => {
      if (parseInt(v) !== NaN) {
        parseInt(v);
        if (v.indexOf("cm") !== -1 && parseInt(v) >= 150 && parseInt(v) <= 193) {
          return true;
        } else if (v.indexOf("in") !== -1 && parseInt(v) >= 59 && parseInt(v) <= 76) {
          return true;
        }
      }
      return false;
    },
    hcl: (v) => {
      if (v[0] === "#" && v.length === 7) {
        v.substring(1)
          .split()
          .forEach((c) => {
            if (parseInt(c, 16) === NaN) {
              return false;
            }
          });

        return true;
      }

      return false;
    },
    ecl: (v) => {
      const valids = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      return valids.includes(v);
    },
    pid: (v) => {
      if (v.length === 9) {
        const valids = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        v.split().forEach((c) => {
          if (parseInt(c) === NaN) {
            return false;
          }
        });

        return true;
      } else {
        return false;
      }
    },
  };

  let validCount = 0;
  let invalidCount = 0;

  let isValid = true;

  passports.forEach((p) => {
    console.log("\n");
    fields.forEach((f) => {
      console.log(f, p[f], p.hasOwnProperty(f) && validators[f](p[f]));
      if (p.hasOwnProperty(f) && validators[f](p[f])) {
      } else {
        isValid = false;
      }
    });

    if (isValid) {
      validCount++;
    } else {
      invalidCount++;
    }

    isValid = true;
  });

  return { validCount, invalidCount };
};

console.log(part2(data));

// console.log(part2([`iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946`]));
