import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import "./styles.css";  // Import CSS

const API_URL = "http://localhost:5000/tasks";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(API_URL)
            .then((res) => setTasks(res.data))
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

    const addTask = (task) => {
        axios.post(API_URL, task)
            .then((res) => setTasks([...tasks, res.data]))
            .catch((error) => console.error("Error adding task:", error));
    };

    const updateTask = (id, updatedTask) => {
        axios.put(`${API_URL}/${id}`, updatedTask)
            .then((res) => setTasks(tasks.map((task) => (task.id === id ? res.data : task))))
            .catch((error) => console.error("Error updating task:", error));
    };

    const deleteTask = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTasks(tasks.filter((task) => task.id !== id)))
            .catch((error) => console.error("Error deleting task:", error));
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
    );
}

export default App;
