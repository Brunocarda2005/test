import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../service/task/tasks-service";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const response = await fetchTasks();
    return response;
  }
);

export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async (task, { dispatch }) => {
    const response = await createTask(task);
    dispatch(fetchTasksThunk()); // Despachar fetchTasksThunk después de crear la tarea
    return response;
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTask }, { dispatch }) => {
    const response = await updateTask(id, updatedTask);
    dispatch(fetchTasksThunk()); // Despachar fetchTasksThunk después de actualizar la tarea
    return response;
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch }) => {
    await deleteTask(id);
    dispatch(fetchTasksThunk()); // Despachar fetchTasksThunk después de eliminar la tarea
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status !== "Completed" ? "Completed" : "Pending";
        task.endDate =
          task.status === "Completed" ? new Date().toISOString() : null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const selectAllTasks = (state) => state.tasks.tasks;

export const { toggleTaskCompleted } = taskSlice.actions;

export default taskSlice.reducer;
