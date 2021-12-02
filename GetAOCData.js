const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

let [year, day, sessionID] = process.argv.slice(2);

year = year ?? "2021";
day = day ?? new Date().getDate();

if (!sessionID && process.env.AOC_COOKIE_SESSION_ID) {
  sessionID = process.env.AOC_COOKIE_SESSION_ID;
} else {
  console.error(
    "No Session ID provided and no AOC_COOKIE_SESSION_ID found in .env. This is required because AoC data is unique to each user. Find it in your browser cookies."
  );
  return;
}

(async () => {
  await GetAOCData(year, day, sessionID);
})();

async function GetAOCData(year, day, sessionID) {
  if (!year || !day || !sessionID) {
    console.error("OOPS! The proper format is /api/aoc/[YEAR]-[DAY]-[AOC SESSION COOKIE ID]");
    return;
  }

  const url = `https://adventofcode.com/${year}/day/${day}/input`;

  const headers = {
    cookie: `session=${sessionID}`,
  };

  try {
    const response = await axios.get(url, { headers }).then((r) => r.data.trim());
    const destination = `${year}/day${day}.txt`;

    fs.writeFileSync(destination, response);

    console.log(`${destination} saved!\nMerry Christmas ya filthy animal`);
  } catch (e) {
    console.error("Something went wrong, didn't get the data. Check the year, day or session cookie ID.");
  }
}
