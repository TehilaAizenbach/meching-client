import logo from './logo.svg';
import './App.css';
import stiker from'./images/stiker.png'
import HomePage from './componnets/homePage';
import MenueTab from './componnets/menueTabs';
import { fetchData } from './api'; 
import { useEffect, useState } from 'react';

function App() {

  const[classes,setClasses]=useState([])
  const[students,setStudents]=useState([])
  const [project,setProject]=useState({});

  useEffect(() => {
  
   fetchDataFromAPI()
  },[])

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
      <HomePage fetchDataFromAPI={fetchDataFromAPI} project={project} classes={classes} students={students}></HomePage>
      <div style={{width:"90%",margin:"auto"}}>
      <MenueTab project={project}  students={students} classes={classes}></MenueTab>
      </div>
    </div>
  );
}
export default App;
