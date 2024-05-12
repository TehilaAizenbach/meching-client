import React, { useEffect, useRef, useState } from "react";
import { DatePicker, Space,Modal,Button,Form } from 'antd';
import { fetchData } from "../api";

const RefrezhProject=({project,setProject,setIsModalOpen,isModalOpen,resetProjectPoints})=>{



const toggleModal = (target) => {
setIsModalOpen(target)}
const timeRef=useRef(null)
const handleDate1Change = (date, dateString) => {
    console.log('Selected Date:', new Date(date));
    console.log('Selected Date:', new Date(date));
    setProject((prevalue) => {
        return {
          ...prevalue,   // Spread Operator               
          ["startDate"]: new Date(date).toString()
        }
      })
      console.log(project);
}
const handleDate2Change = (date, dateString) => {
    console.log('Selected Date:', new Date(date).toString());
    setProject((prevalue) => {
        return {
          ...prevalue,   // Spread Operator               
          ["finish_Date"]: new Date(date).toString()
        }
      })
}

const save=async()=>{
    try {
       let result=await fetchData("/project/update","POST",{project:project})
       await resetProjectPoints(1)
       setIsModalOpen(false)

    //    setProject(result[0])
    } catch (error) {
        
    }
}

return(
    <Modal
    onOk={() => toggleModal(false)}
    onCancel={() => toggleModal(false)}
    width={800} 
    open={isModalOpen} 
    footer={<Button onClick={()=>save()}>החל תוכנית</Button>}>
    <div>
    <Form style={{direction:"rtl"}}>
    <div style={{display:"flex",flexDirection:"column" ,height:"100px",justifyContent:"center", alignItems:"center"}}>
    <div  style={{display:"flex" ,justifyContent:"center"}} >
     <label style={{margin:"3px"}}>תאריך התחלה</label>   
    <DatePicker style={{margin:"3px"}} onChange={handleDate1Change}  showTime  ref={timeRef}></DatePicker>
    </div>
    <div style={{display:"flex",justifyContent:"center"}}>
    <label style={{margin:"3px"}}>תאריך סיום</label>   
    <DatePicker style={{margin:"3px"}} onChange={handleDate2Change}  showTime  ref={timeRef}></DatePicker>
    </div>
    </div>
    </Form>
    </div>
    </Modal>

   
   
)}
export default RefrezhProject;