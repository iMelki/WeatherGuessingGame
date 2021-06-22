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
          realTemps: [...prevState.realTemps, cityTemp]
        }));
        this.setState({nCurrIndex: this.state.nCurrIndex+1});
      })
      .catch(err => console.log(err));
  }

  render1() {
    const { nCurrIndex, guesses, realTemps } = this.state;
    let pageRows = [];
    if (nCurrIndex<5){
      return (
        <div className="App">
            <div>
              <div>
                <CurrentCity
                  cityName={cityNames[nCurrIndex]}
                />
                <GuessingForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
              </div>
              <Guesses currIndex={nCurrIndex-1} guessesArr={guesses} realCityTemps={realTemps} citiesArr={cityNames} />
            </div>
        </div>
      );
    }else{
      let won = false;
      let count = 0;
      for (let i = 0; i < this.state.realTemps.length; i++) {
        if (Math.abs(guesses[i]-realTemps[i]) <= 5){
          count++;
        }
      }
      if (count>2){
        return(
          <div className="">
            <CurrentCity
              cityName={"YOU WON !"}
            />
          </div>
        );
      }else{
        return(
          <div className="">
            <CurrentCity
              cityName={"YOU LOST !"}
            />
          </div>
        );
      }
    }
  }

  
  render() {
    const { nCurrIndex, guesses, realTemps } = this.state;
    let pageRows = [];
    if (nCurrIndex<5){
      pageRows.push(<div>
        <CurrentCity
          cityName={cityNames[nCurrIndex]}
        />
        <GuessingForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
      </div>);
    }else{
      let won = false;
      let count = 0;
      for (let i = 0; i < this.state.realTemps.length; i++) {
        if (Math.abs(guesses[i]-realTemps[i]) <= 5){
          count++;
        }
      }
      if (count>2){
        pageRows.push(
          <div className="">
            <CurrentCity
              cityName={"YOU WON !"}
            />
          </div>
        );
      }else{
        pageRows.push(
          <div className="">
            <CurrentCity
              cityName={"YOU LOST !"}
            />
          </div>
        );
      }
    }
    return (
      <div className="App">
          <div>
            {pageRows}
            <Guesses currIndex={nCurrIndex-1} guessesArr={guesses} realCityTemps={realTemps} citiesArr={cityNames} />
          </div>
      </div>
    );
  }

}

export default App;
