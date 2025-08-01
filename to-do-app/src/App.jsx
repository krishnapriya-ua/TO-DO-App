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

  const [editTask,setEditTask] = useState({name:'',description:''})
  const [editTaskId,setEditTaskId] = useState(null)

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

    const StartEdit = async(task) => {
      setEditTaskId(task._id)
      setEditTask({name:task.name,description:task.description})
    }

    const updateTask = async(e)=>{
      e.preventDefault()
      try {
        const response = await axios.put(`http://localhost:3000/${editTaskId}`,editTask)
        if(response.data.success){
          setTasks(tasks.map(task=>task._id === editTaskId ? { ...task, ...editTask } : task))
          setEditTaskId(null)
          setEditTask({name:'',description:''})
        }
      } catch (error) {
        console.log(error)
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
      {editTaskId && (
        <form>
          <input type="text" value={editTask.name} onChange={(e)=>setEditTask({...editTask,name:e.target.value})} />
          <input type="text" value={editTask.description} onChange={(e)=>setEditTask({...editTask,description:e.target.value})} />
          <button onClick={updateTask}>Update</button>
        </form>
      )}

      <div className="tasks">
        <ul>
        {tasks?.map((task) => 
      
        <li key={task._id}>{task.name}-{task.description}
         <button onClick={()=>DeleteTask(task._id)}>Delete</button>
         <button onClick={()=>StartEdit(task)}>Edit</button>
         </li>
       
        )}
        </ul>
      </div>
    </div>
      
    </>
  )
}

export default App
