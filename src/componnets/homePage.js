import React from "react";
import Clock from "./clock";
import SchoolDestination from "./schoolDestination";
import JoiningFront from "./joiningFront";
import "./homePage.css"
import GrafCard from "./grafCard";

const HomePage =({fetchDataFromAPI,project,classes,students})=>{
  const classObject=classes.map((classItem)=>({title:"כיתה "+classItem.class_name,target:classItem.target,points:classItem.points,code:classItem.class_name}))
  const projectItem={itle:" יעד התיכון",target:project.target,points:project.points} 
  return(
    <div className="container">
    <div className="rightSide">
      <Clock deadline={project.finish_Date} startDate={project.startDate}></Clock>
      <GrafCard item={projectItem}></GrafCard>
      </div>
      <JoiningFront fetchDataFromAPI={fetchDataFromAPI} students={students} classObject={classObject}></JoiningFront>

    </div>)
}
export default HomePage