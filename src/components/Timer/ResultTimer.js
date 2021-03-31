import React, {useEffect, useState} from 'react';

export default function ResultTimer() {

  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    
    let interval = 0;
    let i=0;
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

  return(seconds)

}