import React, {useState, useEffect} from "react";
import "./Game.css";
import GamePadIcon from '../img/Icon-awesome-gamepad.svg';
import PersonIcon from '../img/Icon-material-person.svg';
import TimerControl from '../img/timerControl.svg';
import {GetDataFromLocal, SetDataToLocal} from '../LocalStorage/SetLocalStorageData'
import {getRandomWordFromDictionary} from '../dictionary/Dictionary';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Game(props) {

  if(GetDataFromLocal('playerName')===""){
    alert("This page is not directly accessible");
    window.location.href="/";
  }
  let difficultyFactor = props.difficultyFactor;

    // eslint-disable-next-line
    const wordInputRef = React.createRef(); 
  
    const [userinput, setUserinput] = useState("");
    const [newWord, setNewWord] = useState(giveNewWord());
    const [seconds, setSeconds] = useState(3);
    const [mSeconds, setMSeconds] = useState(100);
    const [isActive, setIsActive] = useState(true);
    const [scoreTimeSec, setScoreTimeSec] = useState(0);
    const [scoreTimeMSec, setScoreTimeMSec] = useState(0);
    const [difficultyFactorNew, setDifficultyFactor] = useState(parseFloat(GetDataFromLocal('difficultyFactor')));
    const [score, setScore] = useState(0);
   // const [level, setLevel] = useState("");

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
            <span style={{ color: "blue" }} key={i}>
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
        setDifficultyFactor(1.01 * difficultyFactorNew);
  
        setNewWord(newWord => giveNewWord(difficultyFactorNew));
        setSeconds(seconds => 3 - difficultyFactor);
  
        setUserinput("");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function toggle() {
      
      setIsActive(false);
      setScore(scoreTimeSec);
      SetDataToLocal('score',score);
      window.location.href="/result";
    }
  
    // function reset() {
    //   setSeconds(3);
    //   setMSeconds(100);
    //   setIsActive(true);

    // }

    useEffect(() => {

      if(wordInputRef.current){
        wordInputRef.current.focus();
      }
      let interval = null;
      // let intervalMS = null;
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
              setMSeconds(mSeconds => mSeconds - 1);
              setScoreTimeMSec(scoreTimeMSec => scoreTimeMSec + 1);              
            }            
            
          }
          
        }, 10);

        if(seconds===0){
          
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
            <div className="headText">
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
              <div className="game-record-result">Game 1:  1:14</div>
              <div className="game-record-result">Game 1:  1:14</div>
              <div className="game-record-result">Game 1:  1:14</div>
              <div className="personal-best">Personal Best</div>
              <div className="game-record-result">Game 1:  1:14</div>
              
  
            </div>
            <div>
              <button className="headText button pt-60" ><b>X</b> STOP GAME</button>
            </div>
            
          </div>
          <div className="col-sm-6">
            <div className="container pt-60">
              <img src={TimerControl} alt="Timer Control" />
              <span className="centered">{seconds > 0 ? seconds-1: seconds}:{mSeconds}</span>
  
            </div>
            <div className="gameText">
              
              <TargetWord targetWord={newWord.toUpperCase()} userInput={userinput}></TargetWord>
  
            </div>
            <div>
              {/* <WordInput ref={ref}/> */}
              <input type="text" className="gameInputBox" id="wordInputVal" ref={wordInputRef} value={userinput} onChange={onUserInputChange}/>
  
            </div>
            
            
          </div>
          <div className="col-sm-3">
              <div>
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