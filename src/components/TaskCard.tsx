import { useState, type DragEvent } from "react";
import { useTasks } from "../hooks/useTasks";
import { useStore } from "../store/store";

import type { Task, TaskCardProps } from "../types";
import TaskForm from "./TaskForm";
import ConfirmDialog from "./ConfirmDialog";

import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export default function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, updateTask } = useTasks();
  const setDraggedTaskId = useStore((s) => s.setDraggedTaskId);

  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /* Drag handlers */
  const handleDragStart = (e: DragEvent) => {
    setIsDragging(true);
    setDraggedTaskId(task.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedTaskId(null);
  };

  return (
    <>
      <div
        className={`card border border-light-subtle task-card p-3 ${isDragging ? "task-card--dragging" : ""}`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id={`task-${task.id}`}
      >
        <h6 className="fw-bold mb-1">{task.title}</h6>
        <p className="text-muted small mb-2 task-desc">{task.description}</p>

        <div className="d-flex justify-content-end gap-1 task-actions">
          <button
            className="btn btn-sm btn-outline-primary border-0 p-1"
            onClick={() => setIsEdit(true)}
            title="Edit task"
          >
            <AiFillEdit size={16} />
          </button>
          <button
            className="btn btn-sm btn-outline-danger border-0 p-1"
            onClick={() => setIsConfirmDelete(true)}
            title="Delete task"
          >
            <MdDelete size={16} />
          </button>
        </div>
      </div>

      {/* Edit task */}
      {isEdit && (
        <TaskForm
          onSubmit={(data: Task) => updateTask({ id: data.id, task: data })}
          initialData={task}
          setIsOpen={setIsEdit}
        />
      )}

      {/* Confirm delete */}
      {isConfirmDelete && (
        <ConfirmDialog
          message={`Delete "${task.title}"? This action cannot be undone.`}
          onConfirm={() => {
            deleteTask(task.id);
            setIsConfirmDelete(false);
          }}
          onCancel={() => setIsConfirmDelete(false)}
        />
      )}
    </>
  );
}
