import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import GrafCard from "./grafCard";
import {fetchData} from "../api"
import './topografy.css'
import { Card,Button,Input, Form, Modal,Result } from "antd";
import './joiningFront.css'
import CheckModal from "./checkModal";
import Progress from "./progress";
import ResultMesseage from "./messege";
// import ResultMesseage from "./messege";

const JoiningFront=({fetchDataFromAPI,students,classObject})=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkClass, setCheckClass] = useState(null)
  const [checkStudent, setCheckStudent] = useState(null)
  const [studentsItems, setStudentsItems] = useState([])
  const [points, setPoints] = useState(0)
  const [isInProgress, setIsInProgress] = useState(false)
  const inputRef = useRef(null);
  const toggleModal = (target) => {
    setIsModalOpen(target)
  }
  const [messeage, setMesseage] = useState(null)

  const customStyles = {
    color: 'red', // Change this to your desired color
    fontSize: '16px',     // Change this to your desired font size
    fontWeight: 'bold'
  };

  useEffect(() => {
    if (!isModalOpen) {
      setCheckClass(null);
      setCheckStudent(null);
    }
  }, [isModalOpen])

  useEffect(
    () => {
      if (checkClass != null) {
        let studentByClass = getStudentsByClass(checkClass);
        setStudentsItems(studentByClass.map((student) => ({ title: student.first_name + " " + student.last_name, target: student.target, points: student.points, code: student.id, group: student.group })))
      }
    }, [checkClass]
  )
    
  const getStudentsByClass = (object) => {
    let studentByClass = students.filter(student => student.group === object?.code);
    return studentByClass;
  }

  const save = async () => {
    try {
      await saveStudent()
      setIsInProgress(false)
      await fetchDataFromAPI()
    

      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  const saveStudent = async () => {
    try{
      let resStudents = await fetchData("students/addPoints", "POST", { 
        points: Number(points), studentItem: checkStudent, code: 1 })
        if (resStudents=="success") {
          setMesseage({status:"success", title:"הנקודות התווספו בהצלחה", subTitle:"",})
        }
    }catch (error) {
      setMesseage({status:error.response.status, title:error.response.status ,subTitle:"",})
      console.log(error);
    }
  }

  return (
    <Card className="text" style={{ width: "60%" }}>
      <h2>הצטרפות לחזית</h2>
      <Form >
        <Form.Item>
          <div className="text" style={{ border: "1px solid red", display: "flex", padding: "10px" }}>
            <Input ref={inputRef} type={"number"} style={customStyles} onChange={(e) =>
              setPoints(inputRef.current.input.value)} bordered={false} activeBorderColor="red" activeShadow="red" />
            <span style={{ fontSize: "20px" }}>נקודות</span>
          </div>
        </Form.Item>
        <Form.Item>
          <Button className="text" onClick={() => { toggleModal(true) }} type="primary" style={{ backgroundColor: "#800102" }}>קבלתי על עצמי...</Button>
        </Form.Item>
      </Form>
      <Modal
        open={isModalOpen}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        width={800}
        footer="">
        {isInProgress && <Progress></Progress>}
        {
          messeage == null ?  
          <div>
{            checkClass == null &&<CheckModal title={"בחרי כתה"} checkItem={checkClass} setCheckItem={setCheckClass} items={classObject}></CheckModal>
}            {checkClass && !checkStudent && <>
              <CheckModal title={"בחרי תלמידה"} checkItem={checkStudent} setCheckItem={setCheckStudent} items={studentsItems}>
              </CheckModal>
              <Button onClick={() => setCheckClass(null)} danger>אחורה</Button></>}
             {  checkStudent && <div style={{ textAlign: "center", direction: "rtl" }}>
              <p>
                בחרת להוסיף ל:
                <b>{checkStudent.title}</b>
                <br></br>
                <b>{points}</b>
                נקודות
              </p>
              <Button onClick={async () => {
                setIsInProgress(true)
                await save()
                // toggleModal(false)
              }} type="primary" danger>אישור</Button>
            </div>}

          </div>:
      <Result
      status={messeage.status}
      title={messeage.title}
      extra={
        <Button onClick={()=>{setIsModalOpen(false) ;
        setMesseage(null)}}>אישור</Button>
      }
      />
        }
      </Modal>
    </Card>)
}
export default JoiningFront