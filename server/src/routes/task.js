import express from "express";
import { TaskModel } from "../models/Tasks.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// router.get("/", async (req,res) => {
//     try {
//         const response = await TaskModel.find({});
//         res.json(response);

//     } catch (error) {
//         console.log(error);
//     }
// });

router.get("/getSpecTask/:taskID", async (req,res) => {
    const taskID = req.params.taskID;

    try {
        const response = await TaskModel.find({_id:taskID});
        res.json(response);

    } catch (error) {
        console.log(error);
    }
});

// VIEW ALL ADDED TASK BY A SPECIFIC USER
router.get("/addedTasks/:userID", async (req,res) => {
    const userID = req.params.userID;
    try {
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

// ADD A TASK
router.post("/", async (req, res) => {
    const task = new TaskModel(req.body);
    try {
        const response = await task.save();
        res.json({message: "Task Successfully Added in the List", response});
    } catch (error) {
        console.log(error);
    }
});

// UPDATE A TASK
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

// DELETE A TASK
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

