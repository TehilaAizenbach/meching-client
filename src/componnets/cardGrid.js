import React from "react";
import GrafCard from "./grafCard";

const CardsGrid=({next,items,click,checkItem,})=>{
return(<div  style={{display:"flex", justifyContent:"center" , flexWrap:'wrap'}}>
{items.map((item)=><div onClick={()=>{click(item)}} style={{width:"30%", margin:"3px"}}>
    <GrafCard  next={next} item={item}></GrafCard></div>)
}</div>)
}
export default CardsGrid;
