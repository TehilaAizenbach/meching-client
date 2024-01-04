import React, { useEffect, useRef, useState } from "react";
import { Tabs} from 'antd';
import TabChildren from "./tabChildren";
import GrafCard from "./grafCard";
import './topografy.css'
const MenueTab=({classes,students,project})=>{
 
   const projectItem={itle:" יעד התיכון",target:project.target,points:project.points}
   const [studentObject,setStudentObject]=useState( students.map((student)=>({title:student.first_name+" "+student.last_name,target:student.target,points:student.points,code:student.id})))
   const [activeKey,setActiveKey]=useState("1");
   const classObject=classes.map((classItem)=>({title:"כיתה "+classItem.class_name,target:classItem.target,points:classItem.points,code:classItem.class_name}))
   const [object,setObject]=useState(null)
   const tabRef=useRef(null)
   const [studentFronted,setStudentFronted]=useState([])
   const { TabPane } = Tabs;
   const tabsItems=[
      {label:" יעד התיכון ",key:"1", children:<GrafCard item={projectItem}/>},
      {label:" יעד כתתי ",key:"2",children:<TabChildren displayPrecent={false} next={true} object={object} setObject={setObject} items={classObject}></TabChildren>},
      {label:" יעד אישי ",key:"3",children:<TabChildren displayPrecent={true} next={false} object={object} items={studentObject}></TabChildren>},
      {label:" בנות מובילות ",key:"4",children:<TabChildren displayPrecent={true} next={false} object={object} items={studentFronted}></TabChildren>}
   ]


   useEffect(()=>{
      calacFrontedStudent()
   },[students])

   useEffect(()=>{
      switch (activeKey) {
         case "2":
            moveTostudentTargetByClass()
            break;
      
         default:
         setStudentObject(students.map((student)=>({title:student.first_name+" "+student.last_name,target:student.target,points:student.points,code:student.id})))
            break;
      }
   },[object])
   

   const calacFrontedStudent=()=>{
      const dictionary = students.reduce((acc, currentObj) => {
         const key = currentObj.group;
         if (!acc[key]) {
           acc[key] = [];
         }
         acc[key].push(currentObj);
         return acc;
       }, {});

      const maxPointsArray=[];

      for (const key in dictionary) {
         if (dictionary.hasOwnProperty(key)) {
           // Get the array of objects corresponding to the current key
           const objectsForKey = dictionary[key];
           // Find the object with the maximum points for the current key
           const maxObjectForKey = objectsForKey.reduce((maxObj, currentObj) => {
             return currentObj.points > maxObj.points ? currentObj : maxObj;
           }, { points: -Infinity });
     
           // Push the object with the maximum points for the current key to the array
           maxPointsArray.push(maxObjectForKey);
         }
       }
       setStudentFronted(maxPointsArray.map((student)=>({title:student.first_name+" "+student.last_name,target:student.target,points:student.points,text:student.group})))

       console.log(studentFronted);

     
   }
   const moveTostudentTargetByClass=()=>{
     
      let studentByClass=students.filter(student=>student.group===object?.code);
      setStudentObject(studentByClass.map((student)=>({title:student.first_name+" "+student.last_name,target:student.target,points:student.points})))
      setActiveKey("3");
   }
   const customActiveTabStyles = {
      color: 'red',       // Change this to your desired active tab text color
      // Add more text-related styles as needed
    };

   return <Tabs primary type="card" className={customActiveTabStyles} colorPrimaryActive={'red'}   style={customActiveTabStyles} activeKey={activeKey} onChange={async(key) => {
   await setObject(null)
   setActiveKey(key)}} centered={true} >
     {tabsItems.map((item)=>(<TabPane className={customActiveTabStyles} type="primary" style={{color:"red"}} tab={item.label} key={item.key}>
        {item.children}
     </TabPane>))}
   </Tabs>
}
export default MenueTab;