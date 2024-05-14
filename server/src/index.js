import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { TaskRouter } from './routes/task.js';

const app = express();

app.use(express.json());
app.use(cors());

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", userRouter);
app.use("/task", TaskRouter);

mongoose.connect(
    "mongodb+srv://ralphkintana02:4Pv1Cqh8GuToYSgq@cluster0.j9pesuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=> {
    console.log("CONNECTED TO DATABASE");
    app.listen(3001, () => {
        console.log(`SERVER STARTED RUNNING ON GIVEN PORT`);
    })
})
.catch((err) => console.log(err))

