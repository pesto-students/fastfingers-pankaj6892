import React, {useState} from 'react';
import Game from '../../folio/game/Game';
import Login from '../../folio/login/Login';
import GamePadIcon from '../../components/assets/img/Icon-awesome-gamepad.svg';
import PersonIcon from '../../components/assets/img/Icon-material-person.svg';
import {GetDataFromLocal} from '../../components/LocalStorage/SetLocalStorageData';
import IconOpenReload from '../../components/assets/img/Icon-open-reload.svg';

const GAME_STATES = {
  RESULT: 'result',
  PLAY: 'play',
  END: 'end'
}

export default function Result(props) {


  
  const scoreList =localStorage.getItem('scoreList');
  const finalScoreList = scoreList.split(',');//JSON.stringify(scoreList);
  
  const highestScoreFlag = Math.max(...finalScoreList) <= props.score ? "Highest Score!" :  "You can do better!";

  const [state, setState] = useState({ 
    gameState: GAME_STATES.RESULT 
  })

  function startGame(){
    setState({
      ...state,
      gameState: GAME_STATES.PLAY
    })
  }

  function endGame(){
    setState({
      ...state,
      gameState: GAME_STATES.END
    })
    
  }
  


  if(state.gameState === GAME_STATES.END) {
    return(
      <Login />
    )
  }

  if(state.gameState === GAME_STATES.PLAY) {
    return(
      <Game />
    )
  }


  return (
    <div className="container-fluid BackgroundStyle">
        <div className="row">
          <div className="col-md-3">
            <div className="headText pt-30">
              <img src={PersonIcon} alt=""/>
              <span className="pl-3">NAME: {GetDataFromLocal('playerName').toUpperCase()}</span>
            </div>
            <div className="headText">
              <img src={GamePadIcon} alt=""/>
              <span className="pl-3">LEVEL: {(props.difficultyfact).toUpperCase()}</span>
            </div>
           
            <div>
              <button className="headText button pt-450" onClick={endGame}>QUIT</button>
            </div>
            
          </div>
          <div className="col-md-6 position-relative pt-30">
            
              <div className="score-game">SCORE: GAME {" " + parseInt(finalScoreList.length)}</div>
              <div className="score-game score-text">Your score is {" " + parseInt(props.score / 60)}:{" " + parseInt(props.score % 60)}</div>
              
              <div><h2 className="text-success">{highestScoreFlag}</h2></div>

              <div className="button" onClick={startGame}><img src={IconOpenReload} alt=">>" width="40px"/> PLAY AGAIN</div>
        
          </div>
          <div className="col-md-3">
              <div>
                <div className="brandText pt-30"><strong>fast fingers</strong></div>
              </div>
              
          </div>
        </div>
      </div>


  )
}