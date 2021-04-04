import React, { useState, useEffect } from 'react'
import WorkingArea from '../../components/WorkingArea/WorkingArea';
import Timer from '../../components/Timer/Timer';
import TargetWord, {getRandomWordFromDictionary} from '../../components/GameControl/GameControl';
import {GetDataFromLocal, SetDataToLocal, AddToLocalStorageArray} from '../../components/LocalStorage/SetLocalStorageData';
import Result from '../../folio/result/Result';
import GamePadIcon from '../../components/assets/img/Icon-awesome-gamepad.svg';
import PersonIcon from '../../components/assets/img/Icon-material-person.svg';

const GAME_STATES = {
  READY: 'ready',
  PLAY: 'play',
  SUCCESS: 'success',
  FAIL: 'fail'
}

const SUCCESS_TEXT = ['Wow! Awesome Work', 'Nice One!', 'Well Done!', 'Suprb!', 'Not Bad!', 'OMG! It was Great']

const Game = (props) => { 

  const [state, setState] = useState({
    word: '',
    typedWord: '',
    gameState: GAME_STATES.READY,
    successText: ''
  })

  const [userinput, setUserinput] = useState("");
  const [difficultyFactorNew, setDifficultyFactor] = useState(parseFloat(GetDataFromLocal('difficultyFactor')));

  const wordInputRef = React.createRef();

  const [resultVal, setResultVal] = useState(0);

  let finalScoreList = [];
  try {
    const scoreList =localStorage.getItem('scoreList');
    finalScoreList = scoreList.split(',');
  } catch (error) {
    
  }
  
  
  useEffect(() => {
    if (wordInputRef.current) {
      wordInputRef.current.focus();
    }  

    giveNewWord();

    startResultCalculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  function startResultCalculation (){
    setTimeout(() => {
      setResultVal(resultVal+1);
      
    }, 1000);
  }




  

  function giveNewWord() {
    const word = getRandomWordFromDictionary(parseFloat(difficultyFactorNew));

    setState({
      ...state,
      word,
      typedWord: '',
      gameState: GAME_STATES.PLAY
    })
    
  }

  function getSuccessText() {
    const text = SUCCESS_TEXT[Math.floor(Math.random() * SUCCESS_TEXT.length)];
    return text;
  }

  



  function onTimerComplete() {    
    setIsActive(false);
    setState({
      ...state,
      gameState: GAME_STATES.FAIL
    })

    
    setTimeout(() => {
      props.onFailure && props.onFailure();
    }, 1000);

  }



  const onUserInputChange = (e) => {
    const { target: { value } = {} } = e;
    setUserinput(value);
    if (value.toUpperCase() === state.word.toUpperCase()) {
      setState({
        ...state,
        gameState: GAME_STATES.SUCCESS,
        successText: getSuccessText()
        //successText: getRandomSuccessText()
      })
      props.onSuccess && props.onSuccess();

      
      setDifficultyFactor(difficultyFactorNew + 0.01);

      setTimeout(() => {
        giveNewWord();
      }, 1000);

      setUserinput("");

      
    }
  };

  
  function getLevel(diffFactor){
      
    if(parseFloat(diffFactor) < 1.5){
      return "EASY";
    }
    else if(parseFloat(diffFactor) < 2.0){
      return "MEDIUM"
    }
    else {
      return "HARD"
    }
  }
  const [seconds, setSeconds] = useState(0);
  
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    
    let interval = 0;

    if (isActive) {
      interval = setInterval(() => {
        
        setSeconds(seconds+1)
        
      }, 1000);      
    
    } else if (!isActive && seconds !== 0) {
      
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, seconds]);


  if(state.gameState === GAME_STATES.FAIL) {
    AddToLocalStorageArray('scoreList', seconds);
    SetDataToLocal('score',seconds);
    return (
      <Result score={seconds} difficultyfact={getLevel(difficultyFactorNew)}/>
    )
  }

  return (
  <div>
   
    <div className="row gameLayout">
      <div className="col-md-3 .d-none.d-sm-block">
        <>
          <div className="headText pt-30">
              <img src={PersonIcon} alt=""/>
              <span className="pl-3">NAME: {GetDataFromLocal('playerName').toUpperCase()}</span>
          </div>
          <div className="headText">
            <img src={GamePadIcon} alt=""/>
            <span className="pl-3">LEVEL: {getLevel(difficultyFactorNew).toUpperCase()}</span>
          </div>
          <div className="gameRecord">
            <span className="score-board">
              SCORE BOARD
            </span>
            {
                finalScoreList.map((value, index) => {
                if(Math.max(...finalScoreList) === parseInt(value))
                return(
                <div>
                  <div className="personal-best">Personal Best</div>
                  <div className="game-record-result">Game {index}: {" " + parseInt(value / 60)}:{parseInt(value % 60)}</div>
                </div>
                )
                else{
                  return(
                    <div className="game-record-result">Game {index}: {" " + parseInt(value / 60)}:{parseInt(value % 60)}</div>
                  )
                } 
                })
            }


            

          </div>
          <div>
            <button className="headText button pt-60" onClick={onTimerComplete}><b>X</b> STOP GAME</button>
          </div>
        </>
       
      </div>
      <div className="col-md-6 pt-50 mh-600">
      {
        state.gameState === GAME_STATES.PLAY &&
        
          
            <>
              <Timer onComplete={onTimerComplete} timeInSec={state.word.length / 1} />
              <div className="gameText">
                <TargetWord targetWord={state.word.toUpperCase()} userInput={userinput}></TargetWord>
              </div>
              <div>      
                <input type="text" className="gameInputBox" id="wordInputVal" ref={wordInputRef} value={userinput} onChange={onUserInputChange} autoComplete="off" autoFocus/>
              </div>
            </>
            
      }
      
      

      {
        state.gameState === GAME_STATES.SUCCESS &&
        <WorkingArea main = {
          <>
            
              <h1 className="text-success">{state.successText}</h1>
            
          </>

        } />
      }

      </div>



        <div className="col-md-3">
              <div className="pt-30">
                <span className="brandText">fast fingers</span>
              </div>
              <div>
          <span className="headText">SCORE:  {parseInt(seconds/60)}:{seconds%60}</span>
              </div>
          </div>
      

    </div>

    
      
  </div> 
    
  )
  
  
  
   

}

export default Game;