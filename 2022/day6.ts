//deno run --allow-read day6.ts

const fileData = await Deno.readTextFile("./day6.txt");

function processMessage( msg, indexStart = 0, offset = 4 ) {

  const packet = msg.slice( indexStart, indexStart + offset );

  if( packet.length === new Set(packet.split('')).size ) {
    return indexStart + offset;
  } else {
    return processMessage( msg, ++indexStart, offset );
  }

}

const part1 = processMessage( fileData );
console.log( part1 );


const part2 = processMessage( fileData, 0, 14 );
console.log( part2 );