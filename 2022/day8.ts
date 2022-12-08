//deno run --allow-read day8.ts

const fileData = await Deno.readTextFile("./day8.txt");

let grid = fileData.split('\n').map( r => r.split('') );

class Tree {

  constructor( 
    public height: number,
    public north?:Tree,
    public south?:Tree,
    public east?:Tree,
    public west?:Tree
  ) {}

  seenFromNorth():boolean {
    let e:Tree|undefined = this;
    
    while(e?.north) {
      if( this.height <= e.north.height ) {
        return false;
      } else {
        e = e.north;
      }
    }

    return true;
  }

  seenFromSouth():boolean {
    let e:Tree|undefined = this;
    
    while(e?.south) {
      if( this.height <= e.south.height ) {
        return false;
      } else {
        e = e.south;
      }
    }

    return true;
  }

  seenFromEast():boolean {
    let e:Tree|undefined = this;
    
    while(e?.east) {
      if( this.height <= e.east.height ) {
        return false;
      } else {
        e = e.east;
      }
    }

    return true;
  }

  seenFromWest():boolean {
    let e:Tree|undefined = this;
    
    while(e?.west) {
      if( this.height <= e.west.height ) {
        return false;
      } else {
        e = e.west;
      }
    }

    return true;
  }

  seenAtAll():boolean {
    return this.seenFromEast() || this.seenFromNorth() || this.seenFromSouth() || this.seenFromWest();
  }

  get scenicScore():number {
    return this.getTotalSeenEast() * this.getTotalSeenNorth() * this.getTotalSeenSouth() * this.getTotalSeenWest();
  }

  getTotalSeenEast():number {
    let e:Tree|undefined = this;
    let seen = 0;
    
    while(e?.east) {
      seen++;
      if( this.height <= e.east.height ) {
        return seen;
      } else {
        e = e.east;
      }
    }

    return seen;
  }

  getTotalSeenWest():number {
    let e:Tree|undefined = this;
    let seen = 0;
    
    while(e?.west) {
      seen++;
      if( this.height <= e.west.height ) {
        return seen;
      } else {
        e = e.west;
      }
    }

    return seen;
  }

  getTotalSeenNorth():number {
    let e:Tree|undefined = this;
    let seen = 0;
    
    while(e?.north) {
      seen++;
      if( this.height <= e.north.height ) {
        return seen;
      } else {
        e = e.north;
      }
    }

    return seen;
  }

  getTotalSeenSouth():number {
    let e:Tree|undefined = this;
    let seen = 0;
    
    while(e?.south) {
      seen++;
      if( this.height <= e.south.height ) {
        return seen;
      } else {
        e = e.south;
      }
    }

    return seen;
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