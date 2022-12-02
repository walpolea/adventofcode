// deno run --allow-read day2.ts

const fileData = await Deno.readTextFile("./day2.txt");

const data = fileData.split("\n");

type ThrowValue = "Rock" | "Paper" | "Scissors";

class RPSThrow {

  static ThrowMap:object = {
    'A':'Rock',
    'B':'Paper',
    'C':'Scissors',
    'X':'Rock',
    'Y':'Paper',
    'Z':'Scissors',
  }

  static ResultMap:object = {
    'X': RPSThrow.loseAgainst,
    'Y': RPSThrow.tieAgainst,
    'Z': RPSThrow.winAgainst,
  }

  static tieAgainst( throwValue:ThrowValue ):ThrowValue {
    switch( throwValue ) {
      case "Rock":
        return "Rock";
      break;
      case "Paper":
        return "Paper";
      break;
      case "Scissors":
        return "Scissors";
      break;
    }
  }

  static winAgainst( throwValue:ThrowValue ):ThrowValue {
    switch( throwValue ) {
      case "Rock":
        return "Paper";
      break;
      case "Paper":
        return "Scissors";
      break;
      case "Scissors":
        return "Rock";
      break;
    }
  }

  static loseAgainst( throwValue:ThrowValue ):ThrowValue {
    switch( throwValue ) {
      case "Rock":
        return "Scissors";
      break;
      case "Paper":
        return "Rock";
      break;
      case "Scissors":
        return "Paper";
      break;
    }
  }

  static rockAgainst( throwValue:RPSThrow ):number {
    switch( throwValue.type ) {
      case "Rock":
        return 3;
      break;
      case "Paper":
        return 0;
      break;
      case "Scissors":
        return 6;
      break;
    }

    
  }

  static paperAgainst( throwValue:RPSThrow ):number {
    switch( throwValue.type ) {
      case "Rock":
        return 6;
      break;
      case "Paper":
        return 3;
      break;
      case "Scissors":
        return 0;
      break;
    }
  }

  static scissorsAgainst( throwValue:RPSThrow ):number {
    switch( throwValue.type ) {
      case "Rock":
        return 0;
      break;
      case "Paper":
        return 6;
      break;
      case "Scissors":
        return 3;
      break;
    }
  }

  static PlayMap:object = {
    "Rock": RPSThrow.rockAgainst,
    "Paper": RPSThrow.paperAgainst,
    "Scissors": RPSThrow.scissorsAgainst,
  }

  static EVALUATE( throwValue:ThrowValue ):RPSThrow {

    switch( throwValue ) {
      case "Rock":
        return new RPSThrow("Rock", 1, RPSThrow.PlayMap["Rock"])
      break;
      case "Paper":
        return new RPSThrow("Paper", 2, RPSThrow.PlayMap["Paper"]);
      break;
      case "Scissors":
        return new RPSThrow("Scissors", 3, RPSThrow.PlayMap["Scissors"]);
      break;
    }

    throw( new Error("Invalid Throw Value") );
  }

  constructor( public type:ThrowValue, public points:number, public playAgainst:Function ) {}

}


class RPSResult {

  static EVALUATE( play:string ):RPSResult {

    const throws = play.split(" ");

    const theirThrow:RPSThrow = RPSThrow.EVALUATE( RPSThrow.ThrowMap[throws[0]]);
    // const myThrow:RPSThrow = RPSThrow.EVALUATE( RPSThrow.ThrowMap[throws[1]] ); // Part 1
    const myThrow:RPSThrow = RPSThrow.EVALUATE( RPSThrow.ResultMap[throws[1]](theirThrow.type) ); //Part 2

    const myScore = myThrow.points + myThrow.playAgainst(theirThrow);
    const theirScore = theirThrow.points + theirThrow.playAgainst(myThrow);

    return new RPSResult( theirThrow, myThrow, theirScore, myScore );
  }

  constructor( public theirThrow:RPSThrow, public myThrow:RPSThrow, public theirScore:number, public myScore:number ) {}

  get didIWin():boolean {
    return this.myScore > this.theirScore;
  }

  get didITie():boolean {
    return this.myScore === this.theirScore;
  }

  get didILose():boolean {
    return this.myScore < this.theirScore;
  }
}


const results = data.map( p => RPSResult.EVALUATE(p) );

const totalScore = results.map( r => r.myScore ).reduce( (sum, val) => sum + val);

console.log( totalScore );

export {};