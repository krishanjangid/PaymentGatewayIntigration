import { Task } from '../models/task.js';
export const newTask = async (req,res,next) => {
    try{
        const {title, description} = req.body;

        if(!title || !description) 
            return res.status(400).json({
                sucess: false,
                message: 'Please provide all the fields',
            });

        await Task.create({
            title,
            description,
            user: req.user._id,
        });

        res.status(201).json({
            sucess: true,
            message: 'Task created successfully'
        });
    }

    catch(err){
        res.status(400).json({message:err.message});
    }
    
};

export const getMyTasks = async (req,res,next) => {
    
    try{
        const userid = req.user._id;
        const tasks = await Task.find({user: userid});
        res.status(200).json({
        sucess: true,
        tasks,
    });
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
    
};
export const updateMyTasks = async (req,res,next) => {
    const {id} = req.params;

    try{
        const task = await Task.findById(id);
        task.isCompleted = !task.isCompleted;
        await task.save();
    
        res.status(200).json({
            sucess: true,
            message: 'Task updated successfully',
        });
    }
    catch(err){
        
        res.status(400).json({message:err.message});
    }
   
};
export const deleteMyTasks = async (req,res,next) => {
    try{
        const {id} = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({
        sucess: true,
        message: 'Task deleted successfully',
    });
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
    
};

