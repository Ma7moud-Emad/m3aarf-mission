import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTask,
  deleteTask,
  getTasks,
  moveTask,
  updateTask,
} from "../services/api";
import type { ColumnKey, Task } from "../types";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 5,
  });

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created!");
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: Task }) =>
      updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated!");
    },
    onError: (error) => toast.error(error.message),
  });

  const moveMutation = useMutation({
    mutationFn: ({ id, column }: { id: string; column: ColumnKey }) =>
      moveTask(id, column),
    onMutate: async ({ id, column }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) => (t.id === id ? { ...t, column } : t)),
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["tasks"], context.previous);
      }
      toast.error("Failed to move task");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted!");
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    tasks: data || [],
    isPending,
    addTask: addMutation.mutate,
    updateTask: updateMutation.mutate,
    moveTask: moveMutation.mutate,
    deleteTask: deleteMutation.mutate,
  };
};
