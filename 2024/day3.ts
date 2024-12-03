const fileData = await Deno.readTextFile("./day3.txt");

const data = fileData;

const mulRegex = /mul\(\d+,\d+\)/g;
const doRegex = /do()/g;
const dontRegex = /don't()/g;

const parser = {
  'mul': {
    regex: /mul\(\d+,\d+\)/g,
    parse: (m) => {
      const [n1, n2] =  m[0].split(',').map( n => parseInt(n.replace(/\D/g, '')) );

      return {
        action: 'mul',
        n1, n2,
        product: n1 * n2,
        index: m['index']
      }
    }
  },
  'do': {
    regex: /do\(\)/g,
    parse: (m) => {
      return {
        action: 'do',
        index: m['index']
      }
    }
  },
  'dont': {
    regex: /don't\(\)/g,
    parse: (m) => {
      return {
        action: 'dont',
        index: m['index']
      }
    }
  },
  PARSE: (action, data) => {
    return [...data.matchAll(parser[action].regex)].map( m => parser[action].parse(m) );
  }
}

//Part 1

const muls = parser.PARSE('mul', data);

console.log( muls);

const sum = muls.reduce( (acc, n) => {
  return acc + n['product'];
}, 0);

console.log(sum);


//Part 2
const dos = parser.PARSE('do', data);
const donts = parser.PARSE('dont', data);

const allCommands = [...muls, ...dos, ...donts].sort( (a,b) => a['index'] - b['index'] );

console.log(allCommands);

const sum2 = allCommands.reduce( (acc, c) => {

  switch( c.action ) {
    case 'mul':
      if( acc.enabled ) {
        acc.sum += c['product'];
      }
    break;
    case 'do':
      acc.enabled = true;
    break;
    case 'dont':
      acc.enabled = false;
    break;
  }  

  return acc;

}, { enabled: true, sum: 0 }).sum;

console.log(sum2);