const fileData = await Deno.readTextFile("./day11.txt");


class Monkey {

  static GROUP:object = {}
  static BIGMOD:bigint;

  static ADD_MONKEY( name:string, m:Monkey ) {
    Monkey.GROUP[name] = m;
  }

  public inspections:bigint = BigInt(0);

  constructor( public name:string, public items:Array<bigint>, public operation:Function, public test:Function ) {

    // console.log( this.items );
  }

  takeTurn() {
    while( this.items.length ) {
      let item:bigint = this.items.shift()!;
      this.inspections++;
      item = this.operation(item);
      // item = ~~(item/BigInt(3)); //PART 1
      item = item % Monkey.BIGMOD; //PART 2
      const [monkeyTo, divisible, divisor] = this.test(item);
      this.throwTo(monkeyTo, item);
    }
  }

  throwTo( monkeyName:string, item:bigint ) {
      Monkey.GROUP[monkeyName].catchItem( item );
  }

  catchItem( item:bigint ) {
    this.items.push(item);
  }

}

//PART 1 and 2

const divisors = new Array<bigint>();
const monkeys = fileData.split('\n\n').map( m => {
  m = m.split('\n');

  let [name, items, operation, test, testTrue, testFalse] = m;

  name = name.toLowerCase().trim().replace(":","");
  items = items.split(": ")[1].split(', ').map( i => BigInt((i)) );

  operation = operation.split(": ").map( o => {
    if( o.trim() === 'Operation') {
      return undefined;
    }

    o = o.split(' = ')[1];
    o = o.split(' ');
    o[2] = `BigInt(${o[2]})`;
    o = o.join(' ');

    return (old) => {
      return eval(o);
    }
  })[1];

  test = test.split(" ");
  const divisor:bigint = BigInt(parseInt( test[test.length-1] ));
  divisors.push(divisor);

  testTrue = testTrue.split("throw to ")[1].trim();
  testFalse = testFalse.split("throw to ")[1].trim();

  test = (item:bigint ) => {
    return item % divisor === BigInt(0) ? [testTrue, true, divisor] : [testFalse, false, divisor];
  };

  m = { name, items, operation, test }

  const monkey = new Monkey( name, items, operation, test );
  Monkey.ADD_MONKEY( name, monkey );

  return monkey;
});

function doRound() {
  monkeys.forEach( m => {
    m.takeTurn();
  })
}

Monkey.BIGMOD = divisors.reduce( (p, d) => {
  return p * d;
})

for( let i = 0; i < 10000; i++ ) {
  doRound();
  console.log( i );
}

const inspections = monkeys.map( m => m.inspections).sort( (a,b) => {
  if(a > b) {
    return -1;
  } else if (a < b){
    return 1;
  } else {
    return 0;
  }
});

console.log( inspections[0] * inspections[1] );