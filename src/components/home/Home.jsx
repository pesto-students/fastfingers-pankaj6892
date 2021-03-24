import React, { useState, useEffect } from 'react'
import "./Home.css";
import AwesomeKeyboard from '../img/Icon-awesome-keyboard.svg';
import StartButton from '../img/Icon-awesome-play.svg';
import {SetDataToLocal} from '../LocalStorage/SetLocalStorageData';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {

  const [error, setError] = useState(0);
  // eslint-disable-next-line
  const userNameRef = React.createRef();
  const [playerName, setPlayerName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  
  const startGame = (event) => {
    
    event.preventDefault();
    if(playerName.length === "0")
    setError(error => 1);
    console.log(error + "  " + playerName.length);
    if(error){
      return; 
    }
    else
    {
      SetDataToLocal('playerName',playerName);
      SetDataToLocal('difficultyFactor',difficultyLevel);
      window.history.pushState({}, "", '/game');
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    }    
  }

  const onDifficultyLevelChange = (e) => {
    setDifficultyLevel(e.target.value)
  }

  useEffect(() => {
    if (userNameRef.current) {
        userNameRef.current.focus();
    }
  },[]);

    const playerNameChangeHandler = (e) => {
      //setError(false);
      setPlayerName(e.target.value);
    }

  return (
    <div className="container-fluid BackgroundStyle">
      <div className="row">
        <div className="col-sm-3">
          
        </div>
        <div className="col-sm-6">
          <div>
            <div>
              <img src={AwesomeKeyboard}  className="Icon-awesome-keyboard" alt="Keyboard Icon"></img>   
            </div>
            <div>
              <span className="fast-fingers">fast fingers</span>
            </div>
            <div>
              <span className="line"></span><span className="the-ultimate-typing-game">the ultimate typing game</span><span className="line"></span>
              
            </div>
            
           <form onSubmit="{startGame}">
                
                  <input type="text" placeholder="TYPE YOUR NAME" className="Rectangle-2 type-your-name" name="playerName" id="playerName" ref={userNameRef} value={playerName} onChange={playerNameChangeHandler}required/>
                  {error ? <div><span className="text-danger float-left">Please enter your name in the box</span></div>: ''}
                
                <select name="difficultyLevel" id="level" className="Rectangle-5 difficulty-level" value={difficultyLevel} onChange={onDifficultyLevelChange}>
                  <option value="1">EASY</option>
                  <option value="1.5">MEDIUM</option>
                  <option value="2">HARD</option>
                </select>
                
                
                <div className="pt-25">
                  <div className="button-design button" onClick={startGame}>
                    <img src={StartButton} alt="Start Button" className="center" />
                    <span className="center">START GAME</span>
                  </div>
                </div>
            </form>
            
          </div>
        </div>
        <div className="col-sm-3">
          
        </div>
      </div>
    </div>
    
  );
}