import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { TaskModel } from "../models/Tasks.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const response = await TaskModel.find({});
        res.json(response);

    } catch (error) {
        console.log(error);
    }
});

router.get("/getSpecTask/:taskID", async (req,res) => {
    const taskID = req.params.taskID;

    try {
        const response = await TaskModel.find({_id:taskID});
        res.json(response);

    } catch (error) {
        console.log(error);
    }
});

router.get("/addedTasks/:userID", async (req,res) => {
    const userID = req.params.userID;
    try {
        // res.json(userID);
        const response = await TaskModel.find({task_addedUser: userID}).sort({ task_dueDate: 1 });
        res.json(response);

    } catch (error) {
        console.log(error);
    }
});

router.get("/savedTasks/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({savedTasks: user?.savedTasks});
    } catch (error) {
        console.log(error);
    }
})

router.get("/savedTasks/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedTasks = await TaskModel.find({
            _id: {
                $in: user.savedTasks
            },
        });

        res.json(savedTasks);
    } catch (error) {
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    const task = new TaskModel(req.body);
    try {
        const response = await task.save();
        res.json({message: "Task Successfully Added in the List", response});
    } catch (error) {
        console.log(error);
    }
});

router.put("/", verifyToken, async (req,res) => {
    try {
        const task =  await TaskModel.findById(req.body.taskID);
        const user = await UserModel.findById(req.body.userID);

        user.savedTasks.push(task);
        await user.save();

        res.json({savedTasks: user.savedTasks});
    } catch (error) {
        console.log(error);
    }
});

router.put("/editTasks/:taskID", async (req, res) => {
    const taskID = req.params.taskID;

    try {
        const data = await TaskModel.findOneAndUpdate(
            {_id : taskID},
            {
                ...req.body
            }
        )
        res.json({data, message: "Task Successfully Edited."})
    } catch (error) {
        console.log(error);
    }
});

router.delete("/delete/addedTask/:taskID", async (req, res) => {
    const taskID = req.params.taskID;
    try {
        const response1 = await TaskModel.findByIdAndDelete({_id: taskID});
        const response2 = await UserModel.updateMany(
            {},
            {$pull: { savedTasks: taskID}}
        )

        if(response1 && response2){
            res.json({status:1, message: "Successfully removed from Task List"});
        } else{
            res.json({status: 0, message: "Something went wrong! Contact Administrator"})
        }
        
    } catch (error) {
        console.log(error);
    }
})

export { router as TaskRouter };

