import React from 'react';
import './Guesses.css';
import Guess from '../Guess/Guess';

const Guesses = ({ guessesArr, realCityTemps }) => {
  return (
    <div>
      <Guess guessArr={guessesArr} realCTemps={realCityTemps} index={0}/>
      <Guess guessArr={guessesArr} realCTemps={realCityTemps} index={1}/>
      <Guess guessArr={guessesArr} realCTemps={realCityTemps} index={2}/>
      <Guess guessArr={guessesArr} realCTemps={realCityTemps} index={3}/>
      <Guess guessArr={guessesArr} realCTemps={realCityTemps} index={4}/>
    </div>
  );
}

export default Guesses;