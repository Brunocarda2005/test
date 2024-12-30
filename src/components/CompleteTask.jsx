import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksThunk, selectAllTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const CompleteTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  const completedTasks = tasks.filter(
    (task) => task?.Estado?.toLocaleLowerCase() === "completed"
  );

  return (
    <div className="w-[70%] mx-auto text-color-principal">
      <div className="mt-10">
        <h1 className="text-3xl font-bold my-8 text-center">Completed Tasks</h1>
      </div>
      {completedTasks.length > 0 ? (
        <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center overflow-y-scroll mt-5 h-[50vh] sm:h-[80vh]">
          {completedTasks.map((task) => (
            <TaskCard
              key={task._id}
              id={task?._id}
              title={task?.Titulo}
              description={task?.Descripcion}
              startDate={task?.createdAt}
              status={task?.Estado}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-[17vh] sm:mt-[30vh]">
          <p>
            No tasks found.{" "}
            <Link to="/addTask" className="text-indigo-500">
              Add a new task
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CompleteTask;
