import React, { useState, useEffect } from 'react'
import WorkingArea from '../../components/WorkingArea/WorkingArea';
import IconAwesomeKeyboard from '../../components/assets/img/Icon-awesome-keyboard.svg';
import StartButton from '../../components/assets/img/Icon-awesome-play.svg';
import {SetDataToLocal} from '../../components/LocalStorage/SetLocalStorageData';
import Game from '../../folio/game/Game';

const LOGIN_STATES = {
  READY: 'ready',
  PLAY: 'play',
  ERROR: 'error'
}

const Login = (props) => {

  let error = false;
  const userNameRef = React.createRef();
  const [playerName, setPlayerName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);

  useEffect(() => {
    if (userNameRef.current) {
        userNameRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const [state, setState] = useState({
    loginState: LOGIN_STATES.READY
  })

  const startGame = (event) => {
    if(playerName.trim() === ""){

      setState({
        ...state,
        loginState: LOGIN_STATES.ERROR
      })
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
      setState({
        ...state,
        loginState: LOGIN_STATES.PLAY
      })
    }    
  }

  const onDifficultyLevelChange = (e) => {
    setDifficultyLevel(e.target.value)
  }

  const playerNameChangeHandler = (e) => {
    error = false;
    setPlayerName(e.target.value);
  }

  // eslint-disable-next-line
  {
    if(state.loginState === LOGIN_STATES.PLAY)
    return(
      <Game />

    ) 
   }

   const handleKeypress = e => {
      if (e.charCode === 13) {
        startGame();
      }
    };

  return (
    <div>  
    
    <WorkingArea main={
    <>
      <img src={IconAwesomeKeyboard} alt="fast fingers"/>
      <div>
        <span className="fast-fingers">fast fingers</span>
      </div>

      <div>
        <span className="line"></span><span className="the-ultimate-typing-game">the ultimate typing game</span><span className="line"></span>
      </div>
    
      <div>
                
          <input type="text" placeholder="TYPE YOUR NAME" className="Rectangle-2 type-your-name" name="playerName" id="playerName" ref={userNameRef} value={playerName} onChange={playerNameChangeHandler} onKeyPress={handleKeypress} required/>
          {
            state.loginState === LOGIN_STATES.ERROR &&
            <div span className="text-danger pr-13">Please enter your name in the box</div>
            
          }

          <div> 
            <select name="difficultyLevel" id="level" className="Rectangle-2 difficulty-level drop-down" value={difficultyLevel} onChange={onDifficultyLevelChange} >
              <option value="1">EASY</option>
              <option value="1.5">MEDIUM</option>
              <option value="2">HARD</option>
            </select>
          </div> 
          
          <div className="pt-25">
            <div className="button-design button" onClick={startGame}>
              <img src={StartButton} alt="Start Button" className="center" />
              <span className="center play-button">START GAME</span>
            </div>
          </div>
        </div>
      

    </>} />
    
    
    
 
  </div>
  )

}

export default Login;