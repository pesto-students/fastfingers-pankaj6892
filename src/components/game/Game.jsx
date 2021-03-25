import React, {useState, useEffect} from "react";
import "./Game.css";
import GamePadIcon from '../img/Icon-awesome-gamepad.svg';
import PersonIcon from '../img/Icon-material-person.svg';
import TimerControl from '../img/timerControl.svg';
import {GetDataFromLocal, SetDataToLocal, AddToLocalStorageArray} from '../LocalStorage/SetLocalStorageData'
import {getRandomWordFromDictionary} from '../dictionary/Dictionary';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Game() {

  if(GetDataFromLocal('playerName')===""){
    alert("This page is not directly accessible");
    window.location.href="/";
  }
  

    const wordInputRef = React.createRef(); 
  
    const [userinput, setUserinput] = useState("");
    
    const [mSeconds, setMSeconds] = useState(100);
    const [isActive, setIsActive] = useState(true);
    const [scoreTimeSec, setScoreTimeSec] = useState(0);
    const [scoreTimeMSec, setScoreTimeMSec] = useState(0);
    const [difficultyFactorNew, setDifficultyFactor] = useState(parseFloat(GetDataFromLocal('difficultyFactor')));
    const [newWord, setNewWord] = useState(giveNewWord(difficultyFactorNew));
    const [seconds, setSeconds] = useState(Math.ceil(newWord.length / difficultyFactorNew));
    const [score, setScore] = useState(0.00);
   

   function giveNewWord(difficultyFactorNew) {

    const word = getRandomWordFromDictionary(parseFloat(difficultyFactorNew));

    return word;
    
    }

    

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

    function TargetWord({ targetWord, userInput }) {
      let content = targetWord.split("").map((ch, i) => {
        if (userInput[i] && ch.toLowerCase() === userInput[i].toLowerCase()) {
          return (
            <span style={{ color: "green" }} key={i}>
              {ch}
            </span>
          );
        } else if (userInput[i]) {
          return (
            <span style={{ color: "red" }} key={i}>
              {ch}
            </span>
          );
        } else {
          return (
            <span style={{ color: "white" }} key={i}>
              {ch}
            </span>
          );
        }
      });
      return <p>{content}</p>;
    }

    const onUserInputChange = (e) => {
      const { target: { value } = {} } = e;
      setUserinput(value);
      if (value === newWord) {

        
        setDifficultyFactor(difficultyFactorNew + 0.01);
  
        setNewWord(newWord => giveNewWord(difficultyFactorNew));
        setSeconds(Math.ceil(newWord.length / difficultyFactorNew));
  
        setUserinput("");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function toggle() {
      
      setIsActive(false);
      // score < 1 ? SetDataToLocal('score',score+0.01): SetDataToLocal('score',score+1.01);
      SetDataToLocal('score',score)
      AddToLocalStorageArray('scoreList', score);
      window.location.href="/result";
    }
  

    useEffect(() => {

      if(wordInputRef.current){
        wordInputRef.current.focus();
      }
      let interval = 0;
      let i=0;
      if (isActive) {
        interval = setInterval(() => {
          
          if(seconds>0){
            
            i=i+1;
            if(i%100===0){
              setSeconds(seconds => seconds - 1);
              setScoreTimeSec(scoreTimeSec => scoreTimeSec + 1);
               if(seconds>1){
                setMSeconds(mSeconds => 100);     
               }
              setScoreTimeMSec(scoreTimeMSec => 0);
            }
            else{
               if(mSeconds > 0){
                setMSeconds(mSeconds => mSeconds - 1);
               }
              setScoreTimeMSec(scoreTimeMSec => scoreTimeMSec + 1); 
              
              setScore(scoreTimeSec + parseFloat(scoreTimeMSec/100));

            }            
  

          }

          
          
        }, 10);

        if(seconds===0 && mSeconds===1){
          
          toggle();
        }
        
      
      } else if (!isActive && seconds !== 0) {
        
        clearInterval(interval);
      }
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, seconds]);


    
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
            <div className="gameRecord">
              <span className="score-board">
                SCORE BOARD
              </span>
              
              {/* <div className="game-record-result">Game 1:  1:14</div>
              <div className="game-record-result">Game 1:  1:14</div>
              <div className="game-record-result">Game 1:  1:14</div>
              <div className="personal-best">Personal Best</div>
              <div className="game-record-result">Game 1:  1:14</div> */}
              
  
            </div>
            <div>
              <button className="headText button pt-60" onClick={toggle}><b>X</b> STOP GAME</button>
            </div>
            
          </div>
          <div className="col-sm-6">
            <div className="container pt-60">
              <img src={TimerControl} alt="Timer Control" />
              <span className="centered">{seconds > 0 ? seconds-1: seconds}:{mSeconds > 0 ? mSeconds : 0}</span>
  
            </div>
            <div className="gameText">
              
              <TargetWord targetWord={newWord.toUpperCase()} userInput={userinput}></TargetWord>
  
            </div>
            <div>
              <input type="text" className="gameInputBox" id="wordInputVal" ref={wordInputRef} value={userinput} onChange={onUserInputChange}/>
  
            </div>
            
            
          </div>
          <div className="col-sm-3">
              <div className="pt-30">
                <span className="headText">fast fingers</span>
              </div>
              <div>
                <span className="headText">SCORE: {scoreTimeSec.toFixed(0,2)}:{scoreTimeMSec} </span>
              </div>
          </div>
        </div>
      </div>
      
    );
}