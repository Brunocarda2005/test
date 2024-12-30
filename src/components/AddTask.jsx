import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { createTaskThunk } from "../store/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Titulo: "",
    Descripcion: "",
    Estado: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTaskThunk(formData));
    setFormData({
      title: "",
      description: "",
      status: "Pending",
    });
  };

  return (
    <div className="w-[70%] mx-auto text-color-principal">
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
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Deferred">Deferred</option>
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
