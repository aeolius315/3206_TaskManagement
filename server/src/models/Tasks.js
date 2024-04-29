import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
    },
    task_description:{
        type: String, 
        require: true
    },
    tast_img_url:{
        type: String, 
        default: 'https://cdn-icons-png.flaticon.com/512/747/747095.png'
    },
    task_status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    task_dueDate:{
        type: Date, 
        require: true
    },
    task_addedUser:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        require: true
    },
});

export const TaskModel = mongoose.model("tasks", TaskSchema);