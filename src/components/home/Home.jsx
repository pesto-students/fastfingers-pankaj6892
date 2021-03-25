import React, { useState, useEffect } from 'react'
import "./Home.css";
import AwesomeKeyboard from '../img/Icon-awesome-keyboard.svg';
import StartButton from '../img/Icon-awesome-play.svg';
import {SetDataToLocal} from '../LocalStorage/SetLocalStorageData';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props) {

  let error = false;
  const userNameRef = React.createRef();
  const [playerName, setPlayerName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  
  const startGame = (event) => {
    
    //event.preventDefault();
    if(playerName.trim() === ""){

      error = true;
     
    }
    else
      error = false;
      
    if(error){
      return true; 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

    const playerNameChangeHandler = (e) => {
      error = false;
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
                
                  <input type="text" placeholder="TYPE YOUR NAME" className="Rectangle-2 type-your-name" name="playerName" id="playerName" ref={userNameRef} value={playerName} onChange={playerNameChangeHandler} required/>
                  {error ? <div span className="text-danger">Please enter your name in the box</div>: ''}
                
                <select name="difficultyLevel" id="level" className="Rectangle-5 difficulty-level" value={difficultyLevel} onChange={onDifficultyLevelChange}>
                  <option value="1">EASY</option>
                  <option value="1.5">MEDIUM</option>
                  <option value="2">HARD</option>
                </select>
                
                
                <div className="pt-25">
                  <div className="button-design button" onClick={startGame}>
                    <img src={StartButton} alt="Start Button" className="center" />
                    <span className="center play-button">START GAME</span>
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