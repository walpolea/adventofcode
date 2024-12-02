// deno run --allow-read day1.ts

const fileData = await Deno.readTextFile("./day1.txt");

// const fileData = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

const data = fileData
  .split("\n").filter( l => l);


const NUMS = '0123456789'.split('');


function getCalibrations( input ) {

  return input.map( line => {

    let lineNums = line.split('').filter( c => NUMS.includes(c) );

    lineNums = [ lineNums.at(0), lineNums.at(-1) ]

    return parseInt(lineNums.join(''));
  });
}

const nums = getCalibrations( data );
const sum = nums.reduce( (acc, cur) => {
  return acc + cur;
});

console.log( sum );



//PART 2

const NUM_WORDS = 'one,two,three,four,five,six,seven,eight,nine'.split(',');
const NUMS_P2 = [...NUMS, ...NUM_WORDS];
const NUMS_MAP = {
  "1":"1",
  "2":"2",
  "3":"3",
  "4":"4",
  "5":"5",
  "6":"6",
  "7":"7",
  "8":"8",
  "9":"9",
  "one":"1",
  "two":"2",
  "three":"3",
  "four":"4",
  "five":"5",
  "six":"6",
  "seven":"7",
  "eight":"8",
  "nine":"9",
}

function findFirstOccurrence( searchStrs, targetString ) {

  let found = false, occurrence;

  while(!found && targetString.length ) {

    searchStrs.every( str => {
      if( targetString.startsWith(str)) {
        found = true;
        occurrence = NUMS_MAP[str] ?? NUMS_MAP[str.split('').reverse().join('')];
        return false;
      }
      return true;
    });

    targetString = targetString.slice(1);
  }

  return occurrence;
}


function getCalibrationsPart2( input ) {

  return input.map( line => {

    const firstNum = findFirstOccurrence( NUMS_P2, line );
    const lastNum = findFirstOccurrence( NUMS_P2.map( str => str.split('').reverse().join('') ), line.split('').reverse().join('') );

    return parseInt([firstNum, lastNum].join(''));
  });
}

const nums2 = getCalibrationsPart2( data );
const sum2 = nums2.reduce( (acc, cur) => {
  return acc + cur;
});

console.log( sum2 );
