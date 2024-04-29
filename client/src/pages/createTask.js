import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/getUserId";
import { useNavigate } from "react-router-dom";

export const CreateTask = () => {
    const navigate = useNavigate();
    const userID = useGetUserID();
    const [task, setTask] = useState({
        task_name: "",
        task_description: "",
        task_img_url: "",
        task_dueDate: "",
        task_addedUser: userID
    });
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setTask({...task, [name]: value});
    }
    // console.log(task);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/task/", task);
            alert("Task Successfully Added!");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label" >Task Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="task_name" 
                        placeholder="Input Name of Task"
                        name="task_name" 
                        onChange={handleChange}
                        />
                </div>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label" >Task Description:</label>
                    <textarea 
                        type="text" 
                        className="form-control" 
                        id="task_description" 
                        placeholder="Input Description of Task"
                        name="task_description" 
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Task Cover Image URL:</label>
                    <input 
                        className="form-control" 
                        id="task_img_url" 
                        placeholder="Past URL of Task Image"
                        name="task_img_url" 
                        onChange={handleChange}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Task Due Date:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="task_dueDate" 
                        placeholder="Past URL of Task Image"
                        name="task_dueDate" 
                        onChange={handleChange}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    )
}