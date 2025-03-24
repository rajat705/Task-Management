import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask({ title });
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add task" />
            <button type="submit">Add</button>
        </form>
    );
};

export default TaskForm;
