import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  toggleTaskCompleted,
  removeTask,
  updateTask,
} from "../store/taskSlice";

const Task = ({
  id,
  title,
  completed,
  description,
  startDate,
  endDate,
  status,
  assignee,
}) => {
  const dispatch = useDispatch();

  const handleToggleCompleted = () => {
    dispatch(toggleTaskCompleted(id));
  };

  const handleRemoveTask = () => {
    dispatch(removeTask(id));
  };

  const handleUpdateTask = (field, value) => {
    dispatch(updateTask({ id, [field]: value }));
  };

  return (
    <li className={`task ${completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggleCompleted}
      />
      <span>{title}</span>
      <p>{description}</p>
      <span className="text-rose-400">
        Start Date: {startDate.slice(0, 10)}
      </span>{" "}
      {/* Format date */}
      <span>End Date: {endDate ? endDate.slice(0, 10) : "---"}</span>{" "}
      {/* Conditional end date display */}
      <select
        value={status}
        onChange={(event) => handleUpdateTask("status", event.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Deployed">Deployed</option>
        <option value="Deferred">Deferred</option>
      </select>
      <input
        type="text"
        value={assignee}
        onChange={(event) => handleUpdateTask("assignee", event.target.value)}
        placeholder="Assignee"
      />
      <button onClick={handleRemoveTask}>Remove</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  status: PropTypes.string.isRequired,
  assignee: PropTypes.string.isRequired,
};

export default Task;
