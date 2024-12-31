import { useDispatch } from "react-redux";
import { deleteTaskThunk, updateTaskThunk } from "../store/taskSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import { EstadosValue } from "../service/const/Estados";

const TaskCard = (params) => {
  const { id, title, description, startDate, status } = params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const dispatch = useDispatch();

  const Estados = {
    PENDING: "Pending",
    IN_PROGRES: "In Progress",
    COMPLETED: "Completed",
  };

  const getDate = (dateString) => {
    const dateObject = new Date(dateString);
    const currentDate = dateObject.toLocaleDateString();
    return currentDate;
  };
  let startDatee = getDate(startDate);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-200 text-green-800";
      case "in progress":
        return "bg-blue-200 text-blue-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "":
        return "bg-yellow-200 text-yellow-800";
    }
  };

  const handleToggleCompleted = () => {
    const keys = Object.keys(EstadosValue).filter((key) => key !== "ALL");
    const keyActual = keys.findIndex((key) => EstadosValue[key] === status);
    const nextKeyIndex = (keyActual + 1) % keys.length;
    const newStatus = EstadosValue[keys[nextKeyIndex]];

    dispatch(
      updateTaskThunk({
        id,
        updatedTask: {
          Titulo: title,
          Descripcion: description,
          Estado: newStatus,
        },
      })
    );
  };

  const handleDeleteTask = () => {
    dispatch(deleteTaskThunk(id));
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleSaveTask = () => {
    dispatch(
      updateTaskThunk({
        id,
        updatedTask: {
          Titulo: editedTitle,
          Descripcion: editedDescription,
          Estado: status,
        },
      })
    );
    setIsEditing(false);
  };

  const showEstado = (estado) => {
    switch (estado) {
      // return "Pending";
      case EstadosValue.PENDING:
        return Estados.PENDING;
      // return "In Progress";
      case EstadosValue.IN_PROGRESS:
        return Estados.IN_PROGRES;
      // return "Completed";
      case EstadosValue.COMPLETED:
        return Estados.COMPLETED;
      // return "All";;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col rounded-xl justify-center gap-4 bg-color-sexto w-72 max-h-[370px] shadow-xl border border-outline`}
    >
      {isEditing ? (
        <div className="p-4">
          <input
            className="w-full p-2 mb-2 border rounded text-color-sexto"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded text-color-sexto resize-none"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 text-white p-2 rounded"
            onClick={handleSaveTask}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div
            className={`relative bg-clip-border mt-6 ml-4 mr-4 rounded-lg ${getStatusColor(
              showEstado(status)
            )} shadow-md h-45`}
          >
            <h1 className="font-bold text-xl py-4 my-5 ubuntu-bold h-full text-center">{`${title}`}</h1>
          </div>
          <div className="border-0 p-2 text-center">
            <p className="poppins-light">{`${description}`}</p>
            <div className="flex justify-between mt-[5px] text-sm font-semibold py-2 px-4">
              <div className="flex justify-center flex-col">
                <p>Start Date</p>
                <p className="font-light">{`${startDatee}`}</p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="footer p-3 flex items-center justify-between">
        <section className="flex justify-between gap-2">
          <MdDelete
            className="text-color-terciario text-2xl cursor-pointer"
            onClick={handleDeleteTask}
          />
          <MdEdit
            className="text-color-terciario text-2xl cursor-pointer"
            onClick={handleEditTask}
          />
        </section>
        <button
          onClick={handleToggleCompleted}
          type="button"
          className={`flex items-center justify-center gap-2 text-black  select-none focus:outline-none shadow-md  uppercase font-bold text-xs py-2 px-6 rounded-lg ${`${getStatusColor(
            showEstado(status)
          )}`}`}
        >
          {showEstado(status)}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
