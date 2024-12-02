const fileData = await Deno.readTextFile("./day12.txt");


type Elevation = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'|'x'|'y'|'z';
type Direction = 'n' | 'e' | 's' | 'w';

const ELEVATIONS:Elevation[] = `abcdefghijklmnopqrstuvwxyz`.split('').map( e => e as Elevation );

class Loc {

  static MOVEMAP = Object.fromEntries( ELEVATIONS.map( (e,i) => {
    let moves:Elevation[] = [e];
    if( ELEVATIONS[i-1] ) { moves.push( ...ELEVATIONS.slice(0, i) ); }
    if( ELEVATIONS[i+1] ) { moves.push( ELEVATIONS[i+1] ); }
    return [e, moves];
  }));

  static CANMOVETO(from:Elevation, to?:Elevation):boolean {

    if(!to) {
      return false;
    }

    return this.MOVEMAP[from].includes(to);
  }

  public north?:Loc;
  public east?:Loc;
  public south?:Loc;
  public west?:Loc;

  public x:number = -1;
  public y:number = -1;

  public isStart:boolean = false;
  public isEnd:boolean = false;

  constructor( public elevation:Elevation ) {}

  canMoveTo( loc?:Loc ):boolean {
    return Loc.CANMOVETO( this.elevation, loc?.elevation );
  }

  canMove(dir?:Direction):boolean {
    console.log(dir);
    if( !dir ) {
      return false;
    }

    switch(dir) {
      case 'n':
        return Boolean(this.north) && Loc.CANMOVETO( this.elevation, this.north?.elevation );
      break;
      case 'e':
        return Boolean(this.east) && Loc.CANMOVETO( this.elevation, this.east?.elevation );
      break;
      case 's':
        return Boolean(this.south) && Loc.CANMOVETO( this.elevation, this.south?.elevation );
      break;
      case 'w':
        return Boolean(this.west) && Loc.CANMOVETO( this.elevation, this.west?.elevation );
      break;
    }
  }

  move( dir:Direction ):Loc | undefined {
    switch(dir) {
      case 'n':
        return this.north;
      break;
      case 'e':
        return this.east;
      break;
      case 's':
        return this.south;
      break;
      case 'w':
        return this.west;
      break;
    }
  }

  get possibleMoves():Loc[] {
    return [this.north, this.south, this.east, this.west].filter( l => l && this.canMoveTo(l) ).map( l => l as Loc );
  }

  get possibleDirections():Direction[] {
    return [
      this.canMoveTo(this.north) ? "n" : undefined,
      this.canMoveTo(this.south) ? "s" : undefined,
      this.canMoveTo(this.east) ? "e" : undefined,
      this.canMoveTo(this.west) ? "w" : undefined,
    ].filter( d => d ).map( d => d as Direction);
  }

}

let start:Loc | undefined = undefined;
let end:Loc | undefined = undefined;

const grid = fileData.split('\n').map( (row,r) => row.split('').map( (l,c) => {
  let loc = new Loc(l);
  loc.x = c;
  loc.y = r;

  if( l === "S" ) {
    loc.elevation = 'a';
    loc.isStart = true;
  } else if( l === "E" ) {
    loc.elevation = 'z';
    loc.isEnd = true;
  }

  return loc;
}));

//set up map
grid.forEach( (row,r) => {
  row.forEach( (loc,c) => {

    const north:Loc | undefined = grid?.[r-1]?.[c];
    const east:Loc | undefined = grid?.[r]?.[c+1];
    const south:Loc | undefined = grid?.[r+1]?.[c];
    const west:Loc | undefined = grid?.[r]?.[c-1];

    loc.north = loc.canMoveTo(north) ? north : undefined;
    loc.east = loc.canMoveTo(east) ? east : undefined;
    loc.south = loc.canMoveTo(south) ? south : undefined;
    loc.west = loc.canMoveTo(west) ? west : undefined;

    if( loc.isStart ) {
      start = loc;
    } else if ( loc.isEnd ) {
      end = loc;
    }
  });
})

function findPath() {

  let current:Loc = start!;
  const traveled:Set<Loc> = new Set<Loc>();
  const path:Loc[] = new Array<Loc>();

  path.push(start!);

  const hasTraveled = (l:Loc):boolean => {
    return traveled.has(l);
  }

  while( path.length && !current.isEnd ) {
    
    // const possibleMoves = current.possibleMoves.filter( m => !hasTraveled(m) ).sort( (a,b) => {
    //   return b.elevation > a.elevation ? 1 : -1;//current.elevation === a.elevation ? -1 : 0;
    // } );
    // const moveTo:Loc|undefined = possibleMoves?.[0];
    // const moveTo:Loc|undefined = possibleMoves?.[~~(Math.random()*possibleMoves.length)];

    console.log( grid.map( r => { return r.map(l => {
      if( current === l ) {
        return "@";
      }
      
      if( path.includes(l) ) {
        return '_';
      }
  
      return l.elevation
    }).join('') }));

    //pathfinding is boring, let's find the answer manually!
    const dir = prompt(`Direction? ${current.possibleDirections.join()}: `);
    const moveTo:Loc|undefined = current.move(dir as Direction);
    
    if( moveTo ) {
      traveled.add( moveTo );
      path.push(moveTo);
      current = moveTo;
    } else {
      current = path.pop() ?? start!;

      if( !current ) {
        path.push(start!);
        current = start!;
      }
    }

  }

  console.log( path.map( l => l.elevation ).join('') );

  for( let i = 0; i < path.length; i++ ) {

    const cur = path[i];

    if( cur ) {
      cur.possibleMoves.forEach( m => {
        const foundIndex = path.findLastIndex((el) => el === m);
        if(  foundIndex !== -1  && foundIndex > i+1 ) {
          path.splice(i+1, foundIndex-(i+1) );
        }
      })
    }
  }

  console.log(path.map( l => l.elevation ).join(''), path.length);

  console.log( grid.map( r => { return r.map(l => {
      if( path.includes(l) ) {
        return ' ';
      }
  
      return l.elevation
    }).join('') }));
}

findPath();

