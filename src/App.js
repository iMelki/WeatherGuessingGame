import React, { Component } from 'react';
//import Particles from 'react-particles-js';
import Guesses from './components/Guesses/Guesses';
import GuessingForm from './components/GuessingForm/GuessingForm';
import CurrentCity from './components/CurrentCity/CurrentCity';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const cityNames = [
  "Tel Aviv",
  "New Jersey",
  "Tokyo",
  "Denver",
  "Barcelona"
];

const initialState = {
  nCurrIndex: 0,
  input: '',
  guesses: [],
  realTemps :[]
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState(prevState => ({
      guesses: [...prevState.guesses, this.state.input]
    }));
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityNames[this.state.nCurrIndex]}&units=metric&appid=8fab3c497494971d10855ecd234121ef`)
      .then(response => response.json())
      .then(response => {
        let cityTemp = response.main.temp;
        this.setState(prevState => ({
          guesses: [...prevState.realTemps, cityTemp]
        }));
        this.setState({nCurrIndex: this.state.nCurrIndex+1});
      })
      .catch(err => console.log(err));
  }

  render() {
    const { nCurrIndex, guesses, realTemps } = this.state;
    return (
      <div className="App">
         
          <div>
              <CurrentCity
                cityName={cityNames[nCurrIndex]}
              />
              <GuessingForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <Guesses guessesArr={guesses} realCityTemps={realTemps} />
          </div>
      </div>
    );
  }
}

export default App;