import logo from './logo.svg';
import './App.css';
import stiker from'./images/stiker.png'
import HomePage from './componnets/homePage';
import MenueTab from './componnets/menueTabs';
import { fetchData } from './api'; 
import { useEffect, useState } from 'react';
import RefrezhProject from './componnets/RefrezhProject';
import { FloatButton } from 'antd'
import{ClockCircleOutlined} from "@ant-design/icons"
function App() {

  const[classes,setClasses]=useState([])
  const[students,setStudents]=useState([])
  const [project,setProject]=useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
   fetchDataFromAPI()
   console.log(project);
   
  },[])
  useEffect(() => {
    console.log(project);
    
   },[project])
  const resetProjectPoints=async(code)=>{
    try{
      const students=await fetchData("students/resetPoints","POST",{});
      console.log(students);
       const project =await fetchData("/project/resetPoints","POST",{code:code})
       console.log(project);
      
       const classes=await fetchData("/classes/resetPoints","POST",{})
      
    }catch(error){
  console.log(error);
    }
   }
      
  
  const fetchDataFromAPI = async () => {
     
    try {
     let data=await fetchData('/project')
      await setProject(data[0])

       
     } catch (error) {
       // Handle errors
     }
    try {
     await setClasses(await fetchData('/classes'))
    
      
    } catch (error) {
      // Handle errors
    }
   
    try {
      const result=await fetchData('/students')
      setStudents(result)
    } catch (error) {
      
    }
  }


  return (
    <div className="App">
      <header className="App-header">
      <img src={stiker} width="100%"></img>
      </header>
      <FloatButton icon={<ClockCircleOutlined />} onClick={() => setIsModalOpen(true)} />
      <RefrezhProject resetProjectPoints={resetProjectPoints} project={project} setProject={setProject} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
      <HomePage fetchDataFromAPI={fetchDataFromAPI} project={project} classes={classes} students={students}></HomePage>
      <div style={{width:"90%",margin:"auto"}}>
      <MenueTab project={project}  students={students} classes={classes}></MenueTab>
      </div>
    </div>
  );
}
export default App;
