// deno run --allow-read day1.ts

const fileData = await Deno.readTextFile("./day1.txt");

const data = fileData
  .split("\n\n")
  .map( (l) => l.split('\n').map( n => parseInt(n)) );

//Part 1
const sums = data.map( (cals, i) => {
  return {
    elfIndex: i,
    cals,
    total: cals.reduce( (sum, cal) => sum + cal )
  }
}).sort( (a,b) => b.total - a.total );

console.log(sums[0]);


// Part 2
const howMany = 3;
let totalCalories = 0;

for( let i = 0; i < howMany; i++) {
  totalCalories += sums[i].total;
}

console.log(totalCalories);