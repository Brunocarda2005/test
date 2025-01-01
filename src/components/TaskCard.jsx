import { useDispatch } from "react-redux";
import { deleteTaskThunk, updateTaskThunk } from "../store/taskSlice";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import { EstadosValue } from "../service/const/Estados";

const TaskCard = (params) => {
  const { id, title, description, startDate, status } = params;
  const MAX_CARACTERES = 68;
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
    handleCancelEdit();
  };

  const handleCancelEdit = () => setIsEditing(false);

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

  const acortadorTexto = (text) => {
    if (text?.length <= MAX_CARACTERES) {
      return text;
    }

    const newText = text?.slice(0, MAX_CARACTERES) + "...";
    return newText;
  };

  return (
    <div
      className={`flex flex-col rounded-xl justify-between gap-4 bg-color-sexto w-72 max-h-[370px] shadow-xl border border-outline p-2`}
    >
      {isEditing ? (
        <div className="flex flex-col">
          <input
            className={`relative bg-clip-border rounded-lg ${getStatusColor(
              showEstado(status)
            )} shadow-md w-full h-[9rem] flex justify-center items-center text-center font-bold text-xl ubuntu-bold`}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="poppins-light h-[5rem] w-full p-2 border rounded text-color-sexto resize-none mt-5"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <footer className="flex gap-2">
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded"
              onClick={() => handleSaveTask()}
            >
              Save
            </button>
            <button
              className="mt-2 bg-red-500 text-white p-2 rounded"
              onClick={() => handleCancelEdit()}
            >
              Cancel
            </button>
          </footer>
        </div>
      ) : (
        <>
          <div
            className={`relative bg-clip-border rounded-lg ${getStatusColor(
              showEstado(status)
            )} shadow-md h-[9rem] flex justify-center items-center`}
          >
            <span className="text-center font-bold text-xl ubuntu-bold">
              {`${acortadorTexto(title)}`}
              {title?.length > MAX_CARACTERES ? (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {title}
                </span>
              ) : null}
            </span>
          </div>
          <div className="border-0 text-center">
            <div className="border-0 text-center relative group">
              <p className="poppins-light h-[5rem]">
                {`${acortadorTexto(description)}`}
                {description?.length > MAX_CARACTERES ? (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {description}
                  </span>
                ) : null}
              </p>
            </div>
            <div className="flex justify-between mt-[5px] text-sm font-semibold py-2 px-4">
              <div className="flex justify-center flex-col">
                <p>Start Date</p>
                <p className="font-light">{`${startDatee}`}</p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="footer flex items-center justify-between">
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
