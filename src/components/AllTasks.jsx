import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksThunk, selectAllTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";
import { IoFilterSharp, IoClose } from "react-icons/io5";

const AllTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const [startDate, setStartDate] = useState(null);
  const [toggle, settoggle] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.startDate);
    const isDateInRange = !startDate || taskDate >= startDate;
    const isStatusMatch =
      statusFilter === "All" || task.status === statusFilter;
    return isDateInRange && isStatusMatch;
  });

  return (
    <div className="w-[70%] mx-auto text-color-principal">
      <div className="mt-10">
        <h1 className="text-3xl ubuntu-bold my-8 text-center">Task Board</h1>
        <div className="flex justify-between items-center">
          <div
            onClick={() => {
              settoggle(!toggle);
            }}
            className="flex justify-center items-center p-2 bg-indigo-500 rounded-md"
          >
            {toggle ? (
              <IoClose className="text-xl" />
            ) : (
              <IoFilterSharp className="text-xl" />
            )}
          </div>
          <div className="text-indigo-500 font-semibold">
            All Task ({filteredTasks.length})
          </div>
        </div>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } mt-10 justify-between items-center sm:flex-row gap-4 flex-col-reverse `}
        >
          <div className="flex  flex-col sm:flex-row gap-2">
            <div className="flex  flex-col sm:flex-row gap-2 items-center">
              <p className="font-bold text-xl text-indigo-500">Filter </p>
              <div className="flex justify-center gap-[10px] sm:gap-2 flex-col sm:flex-row items-center">
                <input
                  className="bg-gray-200 text-color-quinto p-2 rounded-md w-[60vw] sm:w-auto appearance-none"
                  type="date"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row items-center">
            <p className="font-bold text-xl text-indigo-400">Sort </p>
            <div className="flex justify-center gap-[10px] sm:gap-3 flex-row items-center">
              <select
                className="bg-gray-200 text-color-quinto p-2 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {filteredTasks.length > 0 ? (
        <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center  overflow-y-scroll mt-5 h-[80vh] sm:h-[80vh]">
          {filteredTasks.map((task) => (
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

export default AllTasks;
