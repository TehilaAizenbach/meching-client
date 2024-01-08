import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Flex, Progress} from 'antd';
import { format, differenceInSeconds } from 'date-fns';
import './clock.css'

const Clock = ({deadline,startDate}) => {
    const twoColors = { '60%': '#800102', '100%': 'yellow' };
    
    const calculateTimeRemaining = (difference) => {
      const now = new Date();
      // const difference = differenceInSeconds(deadline, now);
      if (difference <= 0) {
        // Deadline has passed
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    const hours =Math.floor(difference/60/60);
    const minutes =Math.floor(difference/60);
    const seconds = Math.floor(difference);
    const percent=seconds/differenceInSeconds(deadline,startDate)*100;
    console.log(percent);
      return { percent, hours, minutes, seconds };
    };
    

    
  
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const difference = differenceInSeconds(deadline, new Date());
        setTimeRemaining(calculateTimeRemaining(difference));
      }, 1000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, [deadline]);
  
    return (
        <Card bordered={true} style={{display:"flex", justifyContent:"center"}}>
        <div className="clock_size" style={{position:"relative",width:"200px", height:"200px"}}>
        <Progress style={{position:"absolute",top:0, left:0}} 
        type="circle" percent={100-timeRemaining.percent}  
        showInfo={false} strokeColor={twoColors} size={200} />
        <div 
        className=".text"
         style={{width:"200px",
         height:"200px" ,
         position:"absolute", 
         top:0,
         left:0,
         display:"flex",
         alignItems:"center",
         justifyContent:"center",
        
        }}
         >
           <div>
             <div>זמן נותר:</div>
             <div><b>{timeRemaining.hours}</b> שעות</div>
             <div><b>{timeRemaining.minutes}</b> דקות</div>
             <div><b>{timeRemaining.seconds}</b> שניות</div>

             
           </div>
        </div>
        </div>
</Card>
  
     
    );
  };
  export default Clock;
  
 

