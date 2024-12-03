const fileData = await Deno.readTextFile("./day2.txt");

const data = fileData
  .split("\n").filter( l => l);

  const levels = data.map( l => l.split(" ").map( n => parseInt(n) ));
  
  console.log(levels);

  function isSafeIncreasing( n, m ) {
    return (n < m && m - n >= 1 && m - n <= 3);
  }

  function isSafeDecreasing( n, m ) {
    return (n > m && n - m >= 1 && n - m <= 3);
  }

  function checkSafe( l ) {
    const safeDec = l.every( (n,i) => i === 0 || isSafeDecreasing(l[i-1], n) );
    const safeInc = l.every( (n,i) => i === 0 || isSafeIncreasing(l[i-1], n) );

    return safeDec || safeInc;
  }

  const safeLevels = levels.filter( l => {
    return checkSafe(l);
  });

  console.log(safeLevels.length);

  //Part 2

  function getVariants( l ) {
    return l.map( (n, i) => {
      return l.toSpliced(i, 1);
    });
  }

  console.log( getVariants([1,2,3,4]) );

  const safeLevels2 = levels.filter( l => {
    const variants = getVariants(l);
    return [l, ...variants].some( l => checkSafe(l) );
  });

  console.log(safeLevels2.length);