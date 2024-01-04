import React from "react";
import { useState, useEffect } from 'react';
import GrafCard from "./grafCard";
import {fetchData} from "../api"
import './topografy.css'




import { Card,Button,Input, Form, Modal } from "antd";
import './joiningFront.css'
import CheckModal from "./checkModal";
const JoiningFront=({fetchDataFromAPI,students,classObject})=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkClass,setcheckClass]=useState(null)
    const [checkStudent,setcheckStudent]=useState(null)
    const [studentsItems,setStudentsItems]=useState([])
    const [points,setPoints]=useState(0)
    const toggleModal = (target) => {

        setIsModalOpen(target)
      }

      const customStyles = {
        color: 'red', // Change this to your desired color
        fontSize: '16px',     // Change this to your desired font size
        fontWeight: 'bold'
      };
    
      useEffect(()=>{
        if (!isModalOpen) {
            setcheckClass(null);
            setcheckStudent(null);
        }
      },[isModalOpen])
      useEffect(
          ()=>{
           if(checkClass!=null){
           let studentByClass= getStudentsByClass(checkClass);
           setStudentsItems(studentByClass.map((student)=>({title:student.first_name+" "+student.last_name,target:student.target,points:student.points, code:student.id})))
          }},[checkClass]
      )
    
      const getStudentsByClass=(object)=>{
        let studentByClass=students.filter(student=>student.group===object?.code);
        return studentByClass;
      }

     const  save= async()=>{
        try {
          saveProject( )
            saveStudent()
            let resClasses=await fetchData("classes/addPoints","POST",{points:Number(points),name:checkClass.code})
            fetchDataFromAPI()
        } catch (error) {
            console.log(error);
        }
     }
     const saveProject=async()=>{
      let resproject=await fetchData("project/addPoints","POST",{points:Number(points),code:1})
     }
     const saveStudent=async()=>{
      let resStudents=await fetchData("students/addPoints","POST",{points:Number(points),id:checkStudent.code})     }
return (
    <Card className="text" style={{width:"60%"}}>
        <h2>הצטרפות לחזית</h2>
        <Form >
    <Form.Item>
    <div className="text" style={{border:"1px solid red", display:"flex" ,padding:"10px"}}>
    <Input type={"number"} style={customStyles} onChange={(e)=>setPoints(e.target.value)}bordered={false} activeBorderColor="red" activeShadow="red"/>
    <span style={{fontSize:"20px"}}>נקודות</span>
    </div>
    </Form.Item>
    <Form.Item>
    <Button className="text" onClick={() => {toggleModal(true)}} type="primary" style={{backgroundColor:"#800102"}}>קבלתי על עצמי...</Button>
    </Form.Item>
    </Form>
    <Modal
        open={isModalOpen[0]}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        width={800} 
        open={isModalOpen} 
        footer="">
            
       {checkClass==null &&
         <CheckModal  title={"בחרי כתה"} checkItem={checkClass} setCheckItem={setcheckClass} items={classObject}></CheckModal>} 
        {checkClass && !checkStudent && <> 
        <CheckModal title={"בחרי תלמידה"} checkItem={checkStudent} setCheckItem={setcheckStudent} items={studentsItems}>
        </CheckModal>
        <Button onClick={()=>setcheckClass(null)} danger>אחורה</Button></>
        }
        {checkStudent &&<div style={{textAlign:"center", direction:"rtl"}}>
            <p>
                בחרת להוסיף ל:
                <b>{checkStudent.title}</b>
                <br></br>
                <b>{points}</b>
                נקודות
              
            </p>
            <Button onClick={()=>{
               save()

                 toggleModal(false)}}  type="primary" danger>אישור</Button>
         </div>}
   </Modal>
</Card>)
}
export default JoiningFront