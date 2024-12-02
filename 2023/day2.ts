const fileData = await Deno.readTextFile("./day2.txt");

// const fileData = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

let games = fileData
  .split("\n").filter( l => l);

games = games.map( game => {
  let [gnum, draws] = game.split(": ");
  gnum = gnum.replaceAll("Game ", "");

  draws = draws.split("; ");

  draws = draws.map( draw => {
    draw = draw.split(", ");

    draw = draw.reduce( (d, dice) => {
      const [count, color] = dice.split(" ");
      d[color] = parseInt(count);
      return d
    }, {});

    return draw;
  });

  return {
    game: parseInt(gnum),
    draws
  }

});


function validateGames(games) {

  const key = { red: 12, green: 13, blue: 14 }

  const validGames = games.filter( game => {
    return game.draws.every( draw => {
      return (draw.red ?? 0) <= key.red && (draw.green ?? 0) <= key.green && (draw.blue ?? 0) <= key.blue;
    })
  });

  console.log( validGames );
  return validGames
}

const validGames = validateGames(games).map( g => g.game );
console.log( validGames );

console.log( validGames.reduce( (sum, g) => {
  return sum + g;
}));

function getMaxCubes( games ) {

  return games.map( game => {
    return {
      game: game.game,
      draws: game.draws.reduce( (newDraw, draw) => {
        // newDraw = newDraw ?? {};
        newDraw = {
          red: Math.max((newDraw?.red ?? 0), (draw?.red ?? 0)),
          green: Math.max((newDraw?.green ?? 0), (draw?.green ?? 0)),
          blue: Math.max((newDraw?.blue ?? 0), (draw?.blue ?? 0)),
        }
        return newDraw;
      })
    }
  })
}

const maxGames = getMaxCubes( games );

console.log( maxGames );

const gamePowers = maxGames.map( game => {
  return (game.draws.red ?? 0) * (game.draws.green ?? 0) * (game.draws.blue ?? 0);
})

console.log( gamePowers );

console.log( gamePowers.reduce( (sum, g) => {
  return sum + g;
}));