import Item from "antd/es/list/Item";
import React, { useEffect } from "react";
import GrafCard from "./grafCard";


const TabChildren=({items,setObject,object,next, displayPrecent})=>{
   return(
   <div >
      {object!=null && <GrafCard item={object} ></GrafCard>}
      <div style={{display:"flex" , flexWrap:'wrap'}}> {items.map((item)=><div style={{width:"30%",}}><GrafCard bonus={false}  displayPrecent={displayPrecent} next={next} setObject={setObject} item={item}></GrafCard></div>)
      }</div>
    </div>)
}



export default TabChildren