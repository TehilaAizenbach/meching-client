import React, { useEffect } from "react";
import { Card, Progress } from "antd";
import {ExportOutlined} from "@ant-design/icons"
import './topografy.css'
const GrafCard=({item,setObject,next,displayPrecent})=>{
const twoColors = { '0%': 'red', '100%': '#800102' };

useEffect(()=>{
    
},[])

const calcPrcent=()=>{
    const precent=Number(item.points)/Number(item.target)*100;
    const numberString=precent.toString()
    const match = numberString.match(/\.\d{2}/);
    return Math.floor(precent)< precent ? Number(Math.floor(precent)+"."+match[0].substring(1))  : precent;
}
return(
    <Card className="text" style={{width:"100%", margin:"auto"}}>
       {next && 
       <div onClick={()=>{ setObject(item)}} 
       style={{display:"flex", justifyContent:"flex-end"}}>
        ראה 
        <ExportOutlined  style={{margin:"3px"}}/></div>}
        <div className="title">{item.title}</div>
        <Progress showInfo={displayPrecent} percent={calcPrcent()} status="active" strokeColor={twoColors} />
        
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