const fileData = await Deno.readTextFile("./day10.txt");


class CPU {
  static X:number = 1;
  static CYCLE:number = 1;

  static BLOCKED_COUNTER:number = 0;

  static EXECUTION_STACK = new Array<Function>();

  static COMMANDS:object = {
    'noop': () => {
      CPU.EXECUTION_STACK.push( () => {} )
    },
    'addx':( add:number ) => {
      CPU.BLOCKED_COUNTER += 1;
      CPU.EXECUTION_STACK.push( () => {
        CPU.X += add;
      })
    }
  }

  static RUN(cmd?:string, arg?:number ) {

    CPU.CYCLE++;

    if( CPU.BLOCKED_COUNTER > 0 ) {
      CPU.BLOCKED_COUNTER--;
    }

    if( CPU.BLOCKED_COUNTER === 0 && CPU.EXECUTION_STACK.length) {
      const command = CPU.EXECUTION_STACK.pop();

      if( command ) {
        command();
      }
    }

    if( cmd ) {
      arg && CPU.COMMANDS[cmd] ? CPU.COMMANDS[cmd](arg) : CPU.COMMANDS[cmd]();
    }
    
  }
}

const commands = fileData.split('\n').map( cmd => {
    cmd = cmd.split(' ')
    if( cmd[1] ) {
      return {
        cmd: cmd[0],
        arg: parseInt(cmd[1])
      }
    } else {
      return {
        cmd: cmd[0]
      }
    }
})

type Pixel = "#" | '.' | ' ';

class CRT {

  static H:number = 40;
  static V:number = 6;

  static SCREEN:Array<Array<Pixel>> = (():Array<Array<Pixel>> => {
    
    const s = new Array<Array<Pixel>>();

    for( let i = 0; i < CRT.V; i++) {
      const a = new Array<Pixel>();
      for( let j = 0; j < CRT.H; j++) {
        a.push(' ');
      }
      s.push(a);
    }

    return s;
  })();

  static DRAW( cycle:number, p:Pixel ) {
    const V = ~~((cycle - 1) / CRT.H);
    const H = (cycle - 1) % CRT.H;

    CRT.SCREEN[V][H] = p;
  }
}


const MAX_CYCLES = 241;

const checks = [20, 60, 100, 140, 180, 220];
let sum = 0;

while( CPU.CYCLE < MAX_CYCLES ) {

  //PART 2
  const what2draw = ():Pixel => {
    const within = [CPU.X-1, CPU.X, CPU.X+1];
    if( within.includes((CPU.CYCLE-1) % CRT.H) ) {
      return "#";
    }
    return ".";
  };
  CRT.DRAW( CPU.CYCLE, what2draw());
  ////////

  if( CPU.BLOCKED_COUNTER === 0 ) {
    const cmd = commands.shift();
    if( cmd ) {
      CPU.RUN(cmd.cmd, cmd?.arg );
    }
  } else {
    CPU.RUN();
  }

  if( checks[0] === CPU.CYCLE ) {
    checks.shift();
    sum += CPU.CYCLE * CPU.X;
  }

  
}

//PART 1
console.log( sum );

//PART 2
console.log( CRT.SCREEN.map( l => l.join('')) );

