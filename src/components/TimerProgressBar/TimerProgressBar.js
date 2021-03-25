import React from 'react';
import './TimerProgressBar.css';


export default function TimerProgressBar(props){


  function startTimer(duration) {

    var timeout = setTimeout(function () {
        var time = duration;
        var i = 1;
        var k = ((i/duration) * 100);
        var l = 100 - k;
        i++;
        document.getElementById("c1").style.strokeDasharray = [l,k];
        document.getElementById("c2").style.strokeDasharray = [k,l];
        document.getElementById("c1").style.strokeDashoffset = l;
        document.getElementById("counterText").innerHTML = duration;
        var interval = setInterval(function() {
            if (i > time) {
                clearInterval(interval);
                clearTimeout(timeout);
                return;
            }
            k = ((i/duration) * 100);
            l = 100 - k;
            document.getElementById("c1").style.strokeDasharray = [l,k];
            document.getElementById("c2").style.strokeDasharray = [k,l];
            document.getElementById("c1").style.strokeDashoffset = l;
            console.log(k, l);
            document.getElementById("counterText").innerHTML = (duration +1)-i;
            i++;
        }, 1000);
    },0);
  }
  
  startTimer(props.time);


  return (
    <div>
      <svg width="400px" height="400px" viewBox="0 0 42 42" class="donut">
          <circle id="c1" cx="21" cy="21" r="15.91549430918954" stroke-dasharray="100 0" stroke-dashoffset="100"></circle>
          <circle id="c2" cx="21" cy="21" r="15.91549430918954" stroke-dasharray="0 100" stroke-dashoffset="0"></circle>
          <g class="chart-text">
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" id="counterText">5</text>
          </g>
      </svg>
    </div>


  )






}





