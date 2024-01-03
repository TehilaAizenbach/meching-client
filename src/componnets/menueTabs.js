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

   const tabsItems=[
      {label:" יעד התיכון ",key:"1", children:<GrafCard item={projectItem}/>},
      {label:" יעד כתתי ",key:"2",children:<TabChildren displayPrecent={false} next={true} object={object} setObject={setObject} items={classObject}></TabChildren>},
      {label:" יעד אישי ",key:"3",children:<TabChildren next={false} object={object} items={studentObject}></TabChildren>}
   ]
   const { TabPane } = Tabs;


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
   

   const moveTostudentTargetByClass=()=>{
      console.log(object.code);
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