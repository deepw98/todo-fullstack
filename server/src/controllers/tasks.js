const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');

const getAllTasks = asyncHandler(async (req,res)=>{
    console.log(req.authData.userId);
    const userId= req.authData.userId;
        const tasks = await Task.find({userId:userId});
        res.status(200).json({tasks});
})

const createTask = asyncHandler(async (req,res)=>{
    const userId = req.authData.userId;
    if(!userId){
        console.log('No userId found');
    }
        const {task,completed} = req.body;
        const newTask = await Task.create({task,completed,userId})
        res.status(201).json({newTask})
})

const getTask = asyncHandler(async (req,res)=>{
        const task = await Task.findById(req.params.id);
        res.status(200).json({task});
   
})

const updateTask = asyncHandler(async (req,res)=>{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!task){
            res.status(404).json({msg:`No task with id:${req.params.id}`});
        }
        res.status(200).json({task});
})

const deleteTask =asyncHandler( async (req,res)=>{
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({task});
   
})

module.exports ={
    getAllTasks,createTask,getTask,updateTask,deleteTask
}