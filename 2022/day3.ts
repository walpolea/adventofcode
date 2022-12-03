// deno run --allow-read day3.ts

const fileData = await Deno.readTextFile("./day3.txt");

const data = fileData.split("\n");

const Items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PrioritiesMap = Object.fromEntries( Items.map( (item,index) => {
  return [item, index+1];
}));

//part 1
function intersectStrings( str1:string, str2:string ):string {
  const arr1 = [...new Set(str1.split(''))];
  return arr1.filter( item => str2.includes(item) ).join('');
}

const rucksacks = data.map( s => [s.slice(0, s.length*.5), s.slice(-(s.length*.5))] );
const duplicates = rucksacks.map( r => intersectStrings(r[0], r[1]) );
const priorities = duplicates.map( d => PrioritiesMap[d] );
const prioritySum = priorities.reduce( (sum, val) => sum + val );

console.log( priorities, prioritySum);


//part 2
const groups:Array<string[]> = new Array<string[]>();

for( let i = 0; i < data.length; i += 3) {
  groups.push( [data[i], data[i+1], data[i+2]] );
}

function evaluateGroup( group:string[] ):string {

  group.sort( (a,b) => b.length - a.length  );
  const arr1 = [...new Set(group[0].split(''))];
  return arr1.filter( item => group[1].includes(item) && group[2].includes(item) ).join('');

}

const badges = groups.map( g => evaluateGroup(g) );
const badgePriorities = badges.map( b => PrioritiesMap[b] );
const badgePrioritySum = badgePriorities.reduce( (sum, val) => sum + val );

console.log( badgePriorities, badgePrioritySum );
export {};