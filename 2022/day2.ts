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

  static WinAgainstMap:object = {
    "Rock":"Paper",
    "Paper":"Scissors",
    "Scissors":"Rock"
  }

  static LoseAgainstMap:object = {
    "Rock":"Scissors",
    "Paper":"Rock",
    "Scissors":"Paper"
  }

  static TieAgainstMap:object = {
    "Rock":"Rock",
    "Paper":"Paper",
    "Scissors":"Scissors"
  }

  static tieAgainst( throwValue:ThrowValue ):ThrowValue {
    return RPSThrow.TieAgainstMap[throwValue];
  }

  static winAgainst( throwValue:ThrowValue ):ThrowValue {
    return RPSThrow.WinAgainstMap[throwValue];
  }

  static loseAgainst( throwValue:ThrowValue ):ThrowValue {
    return RPSThrow.LoseAgainstMap[throwValue];
  }

  static rockAgainstPointsMap:object = {
    "Rock":3,
    "Paper":0,
    "Scissors":6
  }

  static paperAgainstPointsMap:object = {
    "Rock":6,
    "Paper":3,
    "Scissors":0
  }

  static scissorsAgainstPointsMap:object = {
    "Rock":0,
    "Paper":6,
    "Scissors":3
  }

  static rockAgainst( throwValue:RPSThrow ):number {
    return RPSThrow.rockAgainstPointsMap[throwValue.type];
  }

  static paperAgainst( throwValue:RPSThrow ):number {
    return RPSThrow.paperAgainstPointsMap[throwValue.type];
  }

  static scissorsAgainst( throwValue:RPSThrow ):number {
    return RPSThrow.scissorsAgainstPointsMap[throwValue.type];
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