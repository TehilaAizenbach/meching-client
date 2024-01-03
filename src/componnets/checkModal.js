import React, { useEffect, useState } from "react";
import CardsGrid from "./cardGrid";

const CheckModal=({items,checkItem,setCheckItem,title})=>{
return <div style={{textAlign:"center" ,direction:"rtl"}}>
    <h2>{title}</h2>
    <CardsGrid items={items} next={false} checkItem={checkItem} click={setCheckItem}></CardsGrid>
</div>}
export default CheckModal;