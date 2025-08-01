import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [tasks,setTasks] = useState([])
  const [newTask,setNewTask] = useState({
    name:'',
    description:''
  })

  const handleAddTask = async(e) => {
    e.preventDefault()
    try {
      if(newTask.name.trim()!==''){
        const taskData={
          name:newTask.name,
          description:newTask.description,
          status:false
        }
        const response = await axios.post('http://localhost:3000',{newTask:taskData})
        if(response.data.success){
          setNewTask({name:'',description:''})
          setTasks([...tasks,taskData])
        }
        else{
          console.log('Error')
        }
        
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    const Fetchdata = async() => {
      const response = await axios.get('http://localhost:3000')
      if(response.data.success){
        setTasks(response.data.task)
      }
    }
    Fetchdata()
  },[])



    const DeleteTask = async(id)=>{
      const response = await axios.delete(`http://localhost:3000/${id}`)
      if(response.data.success){
        setTasks(tasks.filter(task=>task._id!==id))
      }
    }




  return (
    <>
    <div className="add-tasks">
      <h4>To-do list</h4>
      <form>
        <input placeholder='Enter task' onChange={(e)=>setNewTask({...newTask,name:e.target.value})} value={newTask.name} />
        <input placeholder='Enter description' value={newTask.description} onChange={(e)=>setNewTask({...newTask,description:e.target.value})}/>
        <button onClick={handleAddTask} >Add Task</button>
      </form>

      <div className="tasks">

        <p>{tasks?.map((task) => 
        <>
        <li key={task._id}>{task.name}-{task.description}</li>
         <button onClick={()=>DeleteTask(task._id)}>Delete</button>
         <button>Edit</button>
         </>
        )}</p>
      </div>
    </div>
      
    </>
  )
}

export default App
