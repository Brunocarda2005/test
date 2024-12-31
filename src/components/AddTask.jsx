import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { createTaskThunk } from "../store/taskSlice";
import { EstadosValue } from "../service/const/Estados";
import { MdClose } from "react-icons/md";

const AddTask = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    Titulo: "",
    Descripcion: "",
    Estado: "",
  });

  const ALERT_MESSAGE = {
    ESTADO: "Please select a status",
    TITLE: "Please enter a title",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    if (formData.Titulo.length === 0) {
      setAlert(ALERT_MESSAGE.TITLE);
      return true;
    }

    if (formData.Estado.length === 0) {
      setAlert(ALERT_MESSAGE.ESTADO);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) return;

    dispatch(createTaskThunk(formData));
    setFormData({
      Titulo: "",
      Descripcion: "",
      Estado: "",
    });
  };

  const colorAlert = () => {
    switch (alert) {
      case ALERT_MESSAGE.TITLE:
        return "bg-blue-500";
      case ALERT_MESSAGE.ESTADO:
        return "bg-red-500";
      default:
        return "bg-red-500";
    }
  };

  const handleAlert = () => {
    setAlert(null);
  };

  return (
    <div className="w-[70%] mx-auto text-color-principal">
      <section
        className={`w-auto h-[3rem] flex gap-3 items-center mx-auto my-4 absolute top-[10%] right-[5%] bg-[#ffffffc4] rounded-lg overflow-hidden ${
          alert ? "flex" : "hidden"
        }`}
      >
        <span className={`h-full w-1  ${colorAlert()}`}></span>
        <span className="text-color-sexto font-semibold mr-6">{alert}</span>
        <MdClose
          onClick={() => handleAlert()}
          className="text-color-sexto font-semibold mr-2 cursor-pointer"
        />
      </section>
      <div className="">
        <h1 className="text-3xl font-bold my-8 text-center">Add New Task</h1>
        <div className="grid place-items-center">
          <form
            className="w-full mt-12 sm:mt-0 max-w-lg"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-color-terciario text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Titulo
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-color-terciario border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Titulo"
                  type="text"
                  placeholder="Task Title"
                  name="Titulo"
                  value={formData.Titulo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-color-terciario text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Descripcion
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-color-terciario border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                  id="Descripcion"
                  placeholder="Task Description"
                  name="Descripcion"
                  value={formData.Descripcion}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
              <div className="w-full md-2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-color-terciario text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-color-terciario py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Estado"
                  name="Estado"
                  value={formData.Estado}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value={EstadosValue.PENDING}>Pending</option>
                  <option value={EstadosValue.IN_PROGRESS}>In Progress</option>
                  <option value={EstadosValue.COMPLETED}>Completed</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-full p-3 bg-indigo-500 rounded-lg text-center text-white hover:bg-indigo-300"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
