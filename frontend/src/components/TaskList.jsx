import { useContext } from "react";
import { loginContextObj } from "../contexts/LoginContext";
import axios from "axios";

function TaskList() {
  const { currentUser, setCurrentUser } = useContext(loginContextObj);

  const setTaskCompleted = async (taskid) => {
    let res = await axios.put(
      `http://localhost:8000/user-api/edit-status/userid/${currentUser._id}/taskid/${taskid}`,
      null,
      { withCredentials: true }
    );
    console.log(res);
    if (res.status === 200) {
      setCurrentUser(res.data.payload);
    }
  };

  //delete a task
  const deleteTask = async (taskid) => {
    let res = await axios.put(`http://localhost:8000/user-api/delete-todo/userid/${currentUser._id}/taskid/${taskid}`);
    if (res.status === 200) {
      setCurrentUser(res.data.payload);
    }
  };

  return (
    <div className="mt-4">
      <h1>List of Tasks</h1>
      {currentUser?.todos.map((todoObj) => (
        <div className="mb-3 border border-2 p-3">
          <div className="text-end mb-2">
            <button className="btn btn-close" onClick={() => deleteTask(todoObj._id)}></button>
          </div>
          <div className="text-end">
            <button className="bg-warning border-0 rounded ">{todoObj.status}</button>
          </div>
          <h2>{todoObj.taskName}</h2>
          <small>{todoObj.description}</small>
          <div className="text-end mt-2">
            <button className="btn btn-success" onClick={() => setTaskCompleted(todoObj._id)}>
              Mark as completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
