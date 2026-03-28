import axios from "axios";
import type { ColumnKey, Task } from "../types";

const api = axios.create({
  // baseURL: "http://localhost:4000",
    baseURL: "https://69c8401963393440b31783ff.mockapi.io",

});

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const addTask = (task: Task): Promise<Task> =>
  api.post("/tasks", task).then((r) => r.data);

export const updateTask = (id: string, task: Partial<Task>): Promise<Task> =>
  api.put(`/tasks/${id}`, task).then((r) => r.data);

export const moveTask = (id: string, column: ColumnKey): Promise<Task> =>
  api.put(`/tasks/${id}`, { column }).then((r) => r.data);

export const deleteTask = (id: string): Promise<void> =>
  api.delete(`/tasks/${id}`);
