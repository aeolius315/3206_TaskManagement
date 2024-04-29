export const UpdateModal = ({ task, onUpdate, onInputChange }) => {
    return (
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Modal</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" >Task Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="task_name" 
                                placeholder="Input Name of the Task"
                                name="task_name" 
                                value={task.task_name}
                                onChange={(e) => onInputChange(e.target.value, "task_name")}
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
                                value={task.task_description}
                                onChange={(e) => onInputChange(e.target.value, "task_description")}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Task Cover Image URL:</label>
                            <input 
                                className="form-control" 
                                id="tast_img_url" 
                                placeholder="Past URL of Task Image"
                                name="tast_img_url" 
                                value={task.tast_img_url}
                                onChange={(e) => onInputChange(e.target.value, "tast_img_url")}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Task Due Date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="task_dueDate" 
                                placeholder="Paste URL of Task Image"
                                name="task_dueDate" 
                                value={task.task_dueDate}
                                onChange={(e) => onInputChange(e.target.value, "task_dueDate")}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Task Status:</label>
                            <select 
                                className="form-select" 
                                id="task_status" 
                                aria-label="Select Status"
                                name="task_status" 
                                value={task.task_status}
                                onChange={(e) => onInputChange(e.target.value, "task_status")}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={onUpdate}>Update Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
