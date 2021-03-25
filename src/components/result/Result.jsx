import React from "react";
import "./Result.css";
import GamePadIcon from '../img/Icon-awesome-gamepad.svg';
import PersonIcon from '../img/Icon-material-person.svg';
import iconOpenReload from '../img/Icon-open-reload.svg';
import {GetDataFromLocal} from '../LocalStorage/SetLocalStorageData'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Game(props) {

  if(GetDataFromLocal('playerName')===""){
    alert("This page is not directly accessible");
    window.location.href="/";
  }
  
  
    const difficultyFactorNew = parseFloat(GetDataFromLocal('difficultyFactor'));
    const score = parseFloat(GetDataFromLocal('score'));
    // const scoreList = parseFloat(GetDataFromLocal('scoreList'));
    // const maxScore = Math.max(...scoreList);

   function getLevel(difficultyFactorNew){
      
    if(parseFloat(difficultyFactorNew) < 1.5){
      return "EASY";
    }
    else if(parseFloat(difficultyFactorNew) < 2.0){
      return "MEDIUM"
    }
    else {
      return "HARD"
    }
  }

  function toggle() {
    
    window.location.href="/";
  }

  function playAgain() {

    window.location.href="/game";
  }

  

    return (
      <div className="container-fluid BackgroundStyle">
        <div className="row">
          <div className="col-sm-3">
            <div className="headText pt-30">
              <img src={PersonIcon} alt=""/>
              <span className="pl-3">NAME: {GetDataFromLocal('playerName').toUpperCase()}</span>
            </div>
            <div className="headText">
              <img src={GamePadIcon} alt=""/>
              <span className="pl-3">LEVEL: {getLevel(difficultyFactorNew).toUpperCase()}</span>
            </div>
           
            <div>
              <button className="headText button pt-450" onClick={toggle}>QUIT</button>
            </div>
            
          </div>
          <div className="col-sm-6 position-relative pt-30">
            
              <div className="score-game">SCORE: GAME 5</div>
              <div className="score-game score-text">{score}</div>
              {/* <div className="score-game score-text">{score > maxScore ? "New High Score": "Try again to achieve new highest score"}</div> */}
              <div className="button" onClick={playAgain}><img src={iconOpenReload} alt=">>" width="40px"/> PLAY AGAIN</div>

              
            
          </div>
          <div className="col-sm-3">
              <div>
                <div className="headText pt-30"><strong>fast fingers</strong></div>
              </div>
              
          </div>
        </div>
      </div>
      
    );
}