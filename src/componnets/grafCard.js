import React, { useEffect } from "react";
import { Card, Progress } from "antd";
import {ExportOutlined} from "@ant-design/icons"
import './topografy.css'
const GrafCard=({item,setObject,next,displayPrecent,bonus})=>{
const twoColors = { '0%': 'red', '100%': '#800102' };
 


useEffect(()=>{
    
   
},[])
const colorSuccess= ()=>{return `linear-gradient(90deg, yellow ${precentMore100()-calcPrcent()}%, red ${precentMore100()}%)`;}

const calcPrcent=()=>{
    const precent=Number(item.points)/Number(item.target)*100;
    const numberString=precent.toString()
    console.log(numberString);
    const match = numberString.match(/\.\d{2}/);
    console.log(match);
    // return Math.floor(precent)< precent ? Number(Math.floor(precent)+"."+match[0].substring(1))  : precent;
    return Math.floor(precent)< precent ? Number(Math.floor(precent))  : precent;
}

const precentMore100=()=>{
    let precent=calcPrcent();
    precent=(100/precent)*100;
    const numberString=precent.toString()
    const match = numberString.match(/\.\d{2}/);
    return Math.floor(precent)< precent ? Number(Math.floor(precent))  : precent;
}

return( 
    <Card className="text" style={{width:"100%", margin:"auto"}}>
       {next && 
       <div onClick={()=>{ setObject(item)}} 
       style={{display:"flex", justifyContent:"flex-end"}}>
        ראה 
        <ExportOutlined  style={{margin:"3px"}}/></div>}
        <div className="title">{item.title}</div>
        <Progress showInfo={displayPrecent} 
        format={() => `${calcPrcent()}%`} 
        status={calcPrcent() > 100 ? 'active' : 'normal'}
        percent={calcPrcent()} strokeColor={twoColors}
        success={{
            percent:bonus?100-precentMore100():0,
            strokeColor:"yellow"
        }}
        />
       
        {displayPrecent!=false && <div style={{display:"flex"}}>
            <div>
                <div className="points"><b>{item.points}</b> נקודות
                מתוך <b>{item.target}</b>
                </div>
            </div>
            <div>
            </div>
        </div>}
    </Card>
)
}
export default GrafCard