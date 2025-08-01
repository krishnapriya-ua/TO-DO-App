const express = require('express')
const cors = require('cors')
const app = express()
require('./config.js')
const Task = require('./model/Task.js')

app.use(cors())
app.use(express.json())


app.post('/',async(req,res) => {
    const {newTask} = req.body
    try {
        const task=new Task({
            name:newTask.name,
            description:newTask.description,
            status:false
        })
        await task.save()
        res.status(200).json({success:true,message:'Task saved successfully'})
    } catch (error) {
        res.status(500).json({success:false,message:'Internal server error'})
    }
})

app.get('/',async(req,res)=>{
    try {
        const task = await Task.find()
        res.status(200).json({success:true,task})
    } catch (error) {
        res.status(500).json({success:false,message:'Internal server error'})
    }
})

app.delete('/',async(req,res) => {
    try {
        const {id} = req.params
        const delteTask = await Task.findByIdAndDelete(id)
        res.status(200).json({message:'Deleted sucessfully',success:true})
    } catch (error) {
        res.status(500).json({success:false,message:'Internal server error'})
    }
})

app.listen(3000,(req,res) => {
    console.log('Server listening to port 3000')
})