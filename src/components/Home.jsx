import { useState } from "react";
import { store } from "../store/store";
import TaskList from "./TaskList";
import { addTask } from "../store/taskSlice";

const Home = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState(""); // Optional for description input

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      store.dispatch(
        addTask({
          title: newTaskTitle,
          description: newTaskDescription || "", // Optional description
        })
      );
      setNewTaskTitle("");
      setNewTaskDescription(""); // Clear description input if used
    }
  };

  return (
    <div>
      <div className="App">
        <h1 className="text-3xl font-bold underline text-color-principal">
          Task Manager
        </h1>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Add a new task..."
        />
        <textarea
          value={newTaskDescription}
          onChange={(event) => setNewTaskDescription(event.target.value)}
          placeholder="Task Description (optional)"
        />
        <button onClick={handleAddTask}>Add Task</button>
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
