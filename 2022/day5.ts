//deno run --allow-read day5.ts

const fileData = await Deno.readTextFile("./day5.txt");

let [stackData, moveData] = fileData.split("\n\n");

stackData = stackData.split('\n');
moveData = moveData.split('\n');

const stacks = Object.fromEntries( stackData.pop().split(' ').filter(n => n).map( n => [n,[]]) );

stackData = stackData.map( s => {
  while( s.includes('    ') ) {
    s = s.replaceAll('    [', '[/] [');
  }

  return s.split(' ');
});

Object.keys(stacks).forEach( (k,i) => {
  stacks[k] = stackData.map( col => {
    return col.at(i)
  }).filter( c => c !== '[/]');
})

console.log(stacks);

type Move = {
  amount:number,
  from:number,
  to:number
}

const moves = moveData.map( ins => {
  const [amount, from, to] = ins.replaceAll(/[movefromto]/g, '').split(' ').filter(n => n);
  return { amount:parseInt(amount), from, to };
});

console.log( moves );

function doMove( move:Move ) {
  const { amount, from, to } = move;
  const moving = stacks[from].splice(0, amount);
  // moving.reverse(); //comment out for part 2
  stacks[to] = [ ...moving, ...stacks[to] ];
}

moves.forEach( m => {
  doMove(m);
});


console.log( stacks, Object.values(stacks).map( s => s[0] ).join('') );