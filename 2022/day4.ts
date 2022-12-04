// deno run --allow-read day4.ts

const fileData = await Deno.readTextFile("./day4.txt");

const data = fileData.split("\n");

//part 1
const pairs = data.map( p => {
  const sections = p.split(',');
  return [
    sections[0].split('-').map( n => parseInt(n) ),
    sections[1].split('-').map( n => parseInt(n) )
  ]
});


function checkWithin( section1:number[], section2:number[] ):boolean {
  const [s1_start, s1_end] = section1;
  const [s2_start, s2_end] = section2;

  if( (s1_start <= s2_start && s1_end >= s2_end) ||
      (s2_start <= s1_start && s2_end >= s1_end) ) {
    return true;
  }

  return false;
}

const withins = pairs.filter( p => checkWithin(p[0], p[1]) );

console.log( withins, withins.length );


//part2
function checkOverlap( section1:number[], section2:number[] ):boolean {
  const [s1_start, s1_end] = section1;
  const [s2_start, s2_end] = section2;

  if( (s1_start >= s2_start && s1_start <= s2_end) ||
      (s2_start >= s1_start && s2_start <= s1_end) ||
      (s1_end >= s2_start && s1_end <= s2_end)     ||
      (s2_end >= s1_start && s2_end <= s1_end)
      ) {
    return true;
  }

  return false;
}

const overlaps = pairs.filter( p => checkOverlap(p[0], p[1]) );

console.log( overlaps, overlaps.length );

export {};