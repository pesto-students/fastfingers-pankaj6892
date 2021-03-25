import React from 'react';
import './App.css';
import Game from './components/game/Game';
import Home from './components/home/Home';
import Route from './components/route/Route';
import Result from './components/result/Result';


function App(page) {
  return (
    <div className="App">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/game">
        <Game difficultyFactor="1" time="3"/>
      </Route>
      <Route path="/result">
        <Result score/>
      </Route>
    </div>
  );
}

export default App;
