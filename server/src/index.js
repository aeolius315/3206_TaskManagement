import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { TaskRouter } from './routes/task.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/task", TaskRouter);

mongoose.connect(
    "mongodb+srv://18103694:taskmanagement@taskmanagement.m5hj9rv.mongodb.net/taskmanagement?retryWrites=true&w=majority&appName=TaskManagement"
).then(()=> {
    console.log("CONNECTED TO DATABASE");
    app.listen(3001, () => {
        console.log(`SERVER STARTED RUNNING ON GIVEN PORT`);
    })
})
.catch((err) => console.log(err))

