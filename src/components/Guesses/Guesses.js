import React from 'react';
import './Guesses.css';
import Guess from '../Guess/Guess';

const Guesses = ({ currIndex, guessesArr, realCityTemps, citiesArr }) => {
  let guessComps = [];
  for (var i = 0; i <= currIndex; i++) {
    guessComps.push(<Guess cities={citiesArr} guessArr={guessesArr} realCTemps={realCityTemps} index={i}/>)
  }
  return (
    <div>
      {guessComps}
    </div>
  );
}

export default Guesses;