import type { Dispatch, SetStateAction } from "react";

export type ColumnKey = "backlog" | "in_progress" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  column: ColumnKey;
};

export type ColumnProps = {
  title: string;
  columnKey: ColumnKey;
  tasks: Task[];
  onAddClick: (col: ColumnKey) => void;
  onDrop: (taskId: string, targetColumn: ColumnKey) => void;
};

export type HeaderProps = {
  count: number;
};

export type TaskCardProps = {
  task: Task;
};

export type TaskFormProps = {
  onSubmit: (data: Task) => void;
  initialData?: Task;
  defaultColumn?: ColumnKey;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export type StoreState = {
  search: string;
  setSearch: (value: string) => void;
  draggedTaskId: string | null;
  setDraggedTaskId: (id: string | null) => void;
};
