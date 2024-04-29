import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from '../hooks/getUserId';
import { UpdateModal } from "../components/updateModal";

export const AddedTasks = () => {
    const imgDimes = {
        width: "200px",
        height: "150px",
        margin: "10px 0"
    }
    const customButton = {
        fontSize: ".75rem"
    }
    const pendingStat ={
        color: "#ff0000",
    }
    const compStat = {
        color: "#12d4a2",
    }

    const [addedTasks, setAddedTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalTask, setModalTask] = useState({
        _id: "",
        task_name: "",
        task_description: "",
        tast_img_url: "",
        task_dueDate: ""
    });
    const userID = useGetUserID();

    useEffect(() => {
        const fetchAddedTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/task/addedTasks/${userID}`);
                setAddedTasks(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAddedTasks();
    }, []);

    const removeTaskFromList = async (taskID) => {
        try {
            const response = await axios.delete(`http://localhost:3001/task/delete/addedTask/${taskID}`);
            if(response.data.status == 1){
                alert(response.data.message);
                window.location.reload();
            } else{
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    } 

    const updateModal = (task) => {
        setSelectedTask(task);
        setModalTask({
            _id: task._id,
            task_name: task.task_name,
            task_description: task.task_description,
            tast_img_url: task.tast_img_url,
            task_dueDate: task.task_dueDate.slice(0,10),
            task_status: task.task_status
        });
    };

    const updateTask = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/task/editTasks/${modalTask._id}`,{
                task_name: modalTask.task_name,
                task_description: modalTask.task_description,
                tast_img_url: modalTask.tast_img_url,
                task_dueDate: modalTask.task_dueDate,
                task_status: modalTask.task_status
            })

            if(response.data.data){
                alert(response.data.message);
                window.location.reload();
            }else{
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (value, field) => {
        setModalTask(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <>
            <div className="container">
                <h2>Tasks List</h2>
                <div className="container">
                    {addedTasks.map((task) =>(
                        <div className="card mb-3 mx-5" key={task._id}>
                            <div class="card-header text-end">
                                {
                                    (task.task_status == "Pending")?(
                                        <span style={pendingStat}>{task.task_status}</span>
                                    ):(
                                        <span style={compStat}>{task.task_status}</span>
                                    )
                                }
                            </div>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={task.tast_img_url} className="card-img-top" alt={task.task_name} style={imgDimes}/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="card-title text-start">{task.task_name}</h3>
                                        <p className="card-text text-start">{task.task_description}</p>
                                        <div className="text-end">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-info mx-1"
                                                style={customButton}
                                                data-bs-toggle="modal" 
                                                data-bs-target="#updateModal"
                                                onClick={() => updateModal(task)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-danger mx-1"
                                                style={customButton}
                                                onClick={() => removeTaskFromList(task._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <p className="card-text mt-3 text-end"><small className="text-body-secondary">Due Date: <span >{formatDate(task.task_dueDate)}</span></small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <UpdateModal 
                task={modalTask} 
                onUpdate={updateTask} 
                onInputChange={handleInputChange} 
            />
        </>
    )
}

function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

function isDateExceedsToday(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    return inputDate > currentDate;
  }
  