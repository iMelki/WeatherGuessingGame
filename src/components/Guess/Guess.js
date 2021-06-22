import React from 'react';

const Guess = ({ guessArr, realCTemps, index }) => {
  return (
    <div>
      <div className='white f1'>
        {`${guessArr[index]}`}
      </div>
      <div className='white f3'>
        {`was ${realCTemps[index]}`}
      </div>
    </div>
  );
}

export default Guess;