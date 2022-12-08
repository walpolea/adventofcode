//deno run --allow-read day7.ts

const fileData = await Deno.readTextFile("./day7.txt");

const output = fileData.split('\n');

type Command = {
  keyword:string,
  arg:String
}

interface IFile {
  name:string;
  size:number;
}

class DataFile implements IFile {
  
  constructor( public name:string, public size:number ) {

  }

}

class Directory implements IFile {

  public files:IFile[];

  constructor( public name:string, public parent?:Directory ) {
    this.files = new Array<IFile>();
  }

  addFile( file:IFile ) {
    this.files.push( file );
  }

  get size():number {

    let total = 0;
    this.files.forEach( f => {
      total += f.size;
    });

    return total;
  }

  get dirList():Directory[] {
    return this.files.filter( f => f instanceof Directory ) as Directory[];
  }

  get dirMap():object {
    return Object.fromEntries( this.dirList.map( d => [d.name, d]) );
  }

  getDir(name:string):Directory|undefined {
    
    if( name === ".." ) {
      return this.parent;
    }

    return this.dirMap[name];
  }
}

function changeDirectory(dir, pwd?:Directory):Directory|undefined {
  if(!pwd) {
    return new Directory(dir);
  } else {
    return pwd.getDir(dir);
  }
}

function processOutput( output:string[], pwd?:Directory ) {

  let currentLine:string[] | undefined = output.shift()?.split(' ');

  if( currentLine?.[0] === "$" ) { //if it's a command

    const [_, cmd, arg] = currentLine;
    switch( cmd ) {
      case "cd":
        pwd = changeDirectory(arg, pwd);
        break;
      case "ls": 
        //because I'm processing each line and handling files as an assumed ls output,
        //I can ignore the ls command all together
        break;
    }

  } else if(currentLine?.length === 2 ) { //othewrwise if it's a file
    
    let f:IFile;

    if( currentLine?.[0] === "dir") { //if it's a directory
      f = new Directory( currentLine?.[1], pwd );
    } else { //otherwise it's a data file
      f = new DataFile( currentLine[1], parseInt( currentLine[0]) );
    }

    pwd?.addFile(f);

  }

  while( output.length ) {
    processOutput( output, pwd );
  }

  return pwd;
}



function getUndersizedDirectories( dir:Directory, sizeLimit:number ):Directory[] {

  let underLimit = new Array<Directory>();

  if( dir.size <= sizeLimit) {
    underLimit.push(dir);
  }

  if( dir.dirList.length ) {
    dir.dirList.forEach( d => {
      underLimit = [...getUndersizedDirectories(d, sizeLimit), ...underLimit];
    })
  }

  return underLimit;
}

function getOversizedDirectories( dir:Directory, sizeLimit:number ):Directory[] {

  let underLimit = new Array<Directory>();

  if( dir.size >= sizeLimit) {
    underLimit.push(dir);
  }

  if( dir.dirList.length ) {
    dir.dirList.forEach( d => {
      underLimit = [...getOversizedDirectories(d, sizeLimit), ...underLimit];
    })
  }

  return underLimit;
}

//Part 1
const rootDir = processOutput( output );


if( rootDir ) {
  
  const undersized = getUndersizedDirectories(rootDir, 100000).map( d => {return { name: d.name, size: d.size }} );
  
  console.log( undersized );

  const total = undersized.reduce( (sum, dir) => sum + dir.size, 0);

  console.log("PART 1:", total);

  //Part 2

  const TOTAL_SPACE = 70_000_000;
  const NEEDED_SPACE = 30_000_000;

  const unusedSpace = TOTAL_SPACE - rootDir?.size;
  const spaceNeeded = NEEDED_SPACE - unusedSpace;

  console.log( unusedSpace, spaceNeeded);

  const overSizedDirs = getOversizedDirectories(rootDir, spaceNeeded ).sort( (a,b) => a.size - b.size ).map( d => {return { name: d.name, size: d.size }} ) ;

  console.log( "PART 2:", overSizedDirs[0] );

}
