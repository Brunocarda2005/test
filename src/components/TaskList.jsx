import { useSelector } from "react-redux";
import Task from "./Task"; // Reference the Task component

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <Task key={task._id} {...task} />
      ))}
    </ul>
  );
};

export default TaskList;
