const fs = require("fs");
const data = fs.readFileSync("./day2.txt", "utf8");

function parseData(d) {
  const passwords = [];

  d = d.split("\n");

  console.log(d);

  d.filter((d) => d !== "").forEach((p) => {
    const pwd = p.split(" ");
    pwd[0] = pwd[0].split("-");
    pwd[1] = pwd[1].replace(":", "");

    const password = {
      min: pwd[0][0],
      max: pwd[0][1],
      letter: pwd[1],
      phrase: pwd[2],
    };

    passwords.push(password);
  });

  return passwords;
}

function countOccurrences(char, str) {
  const count = str.split("").reduce((acc, cur) => (cur === char ? ++acc : acc), 0);

  // console.log(count, char, str);
  return count;
}

function checkPassword(password) {
  const occurrences = countOccurrences(password.letter, password.phrase);

  console.log(password.min, countOccurrences(password.letter, password.phrase), password.max);
  if (occurrences >= password.min && occurrences <= password.max) {
    return true;
  }
  return false;
}

const passwords = parseData(data);
const goodPasswords = passwords.filter((p) => checkPassword(p));

console.log(passwords.length, goodPasswords.length);

//PART 2

function parseData2(d) {
  const passwords = [];

  d = d.split("\n");

  d.filter((d) => d !== "").forEach((p) => {
    const pwd = p.split(" ");
    pwd[0] = pwd[0].split("-");
    pwd[1] = pwd[1].replace(":", "");

    const password = {
      firstIndex: parseInt(pwd[0][0]) - 1,
      secondIndex: parseInt(pwd[0][1]) - 1,
      letter: pwd[1],
      phrase: pwd[2],
    };

    passwords.push(password);
  });

  return passwords;
}

function checkPassword2(p) {
  const phrase = p.phrase.split("");

  let count = 0;

  if (phrase.length > p.firstIndex && phrase[p.firstIndex] === p.letter) {
    count++;
  }

  if (phrase.length > p.secondIndex && phrase[p.secondIndex] === p.letter) {
    count++;
  }

  if (count === 1) {
    return true;
  }

  return false;
}

const passwords2 = parseData2(data);
const goodPasswords2 = passwords2.filter((p) => checkPassword2(p));

console.log(passwords2.length, goodPasswords2.length);
