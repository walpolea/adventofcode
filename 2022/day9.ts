const fileData = await Deno.readTextFile("./day9.txt");

const moves = fileData.split('\n').map( move => {
  let [ dir, amount ] = move.split(' ');
  amount = parseInt(amount);

  const m:Direction[] = new Array<Direction>();

  for( let i = 0; i < amount; i++ ) {
    m.push(dir);
  }

  return m;
}).flat();


type Coord = {x:number, y:number};
type Direction = "R" | "U" | "D" | "L";

class Knot {

  static MOVE = {
    "R": (c:Coord):Coord => { return { x: c.x+1, y: c.y } },
    "U": (c:Coord):Coord => { return { x: c.x, y: c.y-1 } },
    "D": (c:Coord):Coord => { return { x: c.x, y: c.y+1 } },
    "L": (c:Coord):Coord => { return { x: c.x-1, y: c.y } },
  }

  public visited:Set<string> = new Set<string>();
  constructor( public position:Coord ) {
    this.addVisited();
  }

  move( dir:Direction ) {
    this.position = Knot.MOVE[dir](this.position);
    
  }

  addVisited() {
    this.visited.add( `${this.position.x}-${this.position.y}` );
  }

  movesFrom( target:Knot ):Coord {
    const dist:Coord = {
      x: target.position.x - this.position.x,
      y: target.position.y - this.position.y
    }

    return dist;
  }

  follow( target:Knot ) {
    const dist = this.movesFrom(target);

    if( dist.x >= 2) {
      this.move("R");

      //check diagonal
      if( dist.y === 1) {
        this.move("D");
      } else if( dist.y === -1) {
        this.move("U")
      }

    } else if( dist.x <= -2) {
      this.move("L");

      //check diagonal
      if( dist.y === 1) {
        this.move("D");
      } else if( dist.y === -1) {
        this.move("U")
      }
    }

    if( dist.y >= 2) {
      this.move("D");

      //check diagonal
      if( dist.x === 1) {
        this.move("R");
      } else if( dist.x === -1) {
        this.move("L")
      }

    } else if( dist.y <= -2) {
      this.move("U");

      //check diagonal
      if( dist.x === 1) {
        this.move("R");
      } else if( dist.x === -1) {
        this.move("L")
      }
    }

    this.addVisited();
  }
}

//Part 1
const start:Coord = { x:0, y:0 };
const H = new Knot(start);
const T = new Knot(start);

moves.forEach( move => {

  H.move( move );
  T.follow(H);

})

console.log( T.visited.size );

//Part 2
const knots:Knot[] = ["H", "1", "2", "3", "4", "5", "6", "7", "8", "T"].map( k => new Knot(start) );

moves.forEach( move => {

  knots.forEach( (k,i) => {
    if( i === 0) {
      k.move(move);
    } else {
      k.follow(knots[i-1]);
    }
  })
});

console.log( knots[knots.length-1].visited.size );