import React from 'react';

const Guess = ({ guessArr, realCTemps, index }) => {
  let correct = Math.abs(guessArr[index]-realCTemps[index]) <= 5 ;
  return (
    <div className={"b "+(correct ? "dark-green" : "red")}>
      <div className='f1'>
        {`${guessArr[index]}`}
      </div>
      <div className='f3'>
        {`was ${realCTemps[index]}`}
      </div>
    </div>
  );
}

export default Guess;