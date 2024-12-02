const fileData = await Deno.readTextFile("./day1.txt");

const data = fileData
  .split("\n").filter( l => l);

//  console.log(data);

 const splitdata = data.map( l => l.split("   ").map( (n => parseInt(n) )));

 const leftdata = splitdata.map( cols => cols[0] ).sort();
 const rightdata = splitdata.map( cols => cols[1] ).sort();

 const diffs = leftdata.map( (n, i) => Math.abs(rightdata[i] - n) );
  const sumOfDiffs = diffs.reduce( (acc, n) => acc + n, 0);

 console.log( diffs, sumOfDiffs )


 //Part 2

 let similarityScore = leftdata.map( n => n * countAppearances(n, rightdata) ).reduce( (acc, n) => acc + n, 0);

 function countAppearances( num, arr ) {
    return arr.filter( n => n === num ).length;
 }

 console.log( similarityScore );