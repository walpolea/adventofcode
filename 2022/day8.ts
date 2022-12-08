//deno run --allow-read day8.ts

const fileData = await Deno.readTextFile("./day8.txt");

let grid = fileData.split('\n').map( r => r.split('') );

type Direction = "north" | "south" | "east" |"west";

class Tree {

  constructor( 
    public height: number,
    public north?:Tree,
    public south?:Tree,
    public east?:Tree,
    public west?:Tree
  ) {}

  seenFrom( direction:Direction ):boolean {
    let e:Tree|undefined = this;
    
    while(e?.[direction]) {
      if( this.height <= (e[direction]?.height ?? 0) ) {
        return false;
      } else {
        e = e[direction];
      }
    }

    return true;
  }

  seenAtAll():boolean {
    return this.seenFrom("north") || this.seenFrom("south") || this.seenFrom("east") || this.seenFrom("west");
  }

  getTotalSeen( direction:Direction ):number {
    let e:Tree|undefined = this;
    let seen = 0;
    
    while(e?.[direction]) {
      seen++;
      if( this.height <= (e[direction]?.height ?? 0) ) {
        return seen;
      } else {
        e = e[direction];
      }
    }

    return seen;
  }

  get scenicScore():number {
    return this.getTotalSeen("north") * this.getTotalSeen("south") * this.getTotalSeen("east") * this.getTotalSeen("west");
  }

}

//Turn all the heights into trees
grid = grid.map( row => {
  return row.map( tree => new Tree( tree ) );
});

//Now set the neightbors for each tree
grid = grid.map( (row, y) => {
  return row.map( (tree, x) => {
    tree.north = grid?.[y-1]?.[x];
    tree.south = grid?.[y+1]?.[x];
    tree.east  = grid?.[y]?.[x+1];
    tree.west  = grid?.[y]?.[x-1];

    return tree;
  } );
});

//get the total seen trees from any direction
const seenTrees = grid.reduce( (total, seen) => {
  return [...total, ...seen.filter( tree => {
    return tree.seenAtAll(); 
  })];
}, []);

console.log( seenTrees.length ); //Part 1

//Part 2
//get the total scenic scores for al trees and sort them descending
const scores = grid.reduce( (scores, row) => {
  return [...scores, ...row.map( tree => tree.scenicScore ).filter( s => s)];
}, []);

console.log( scores.sort( (a,b) => b - a), scores[0] );



export {};