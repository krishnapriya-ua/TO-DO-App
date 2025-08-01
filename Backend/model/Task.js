const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
    description:{
        type:String
    }
})

const Task = mongoose.model('Task',TaskSchema)
module.exports=Task