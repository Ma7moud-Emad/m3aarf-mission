import { useState, type DragEvent } from "react";
import TaskCard from "./TaskCard";
import type { ColumnProps } from "../types";
import { useStore } from "../store/store";

const PAGE_SIZE = 5;

export default function Column({
  title,
  columnKey,
  tasks,
  onAddClick,
  onDrop,
}: ColumnProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleTasks = tasks.slice(0, visibleCount);
  const hasMore = tasks.length > visibleCount;

  const [isDragOver, setIsDragOver] = useState(false);
  const draggedTaskId = useStore((s) => s.draggedTaskId);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggedTaskId) {
      onDrop(draggedTaskId, columnKey);
    }
  };

  return (
    <div
      className={`card border kanban-column bg-body-secondary ${isDragOver ? "kanban-column--drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      id={`column-${columnKey}`}
    >
      <div className="card-header bg-transparent d-flex align-items-center gap-2 py-3">
        <span className={`col-dot col-dot--${columnKey}`} />
        <span className="fw-bold text-uppercase small text-secondary letter-spacing-1">
          {title}
        </span>
        <span className="badge bg-secondary bg-opacity-25 text-secondary ms-auto rounded-pill">
          {tasks.length}
        </span>
      </div>

      <div className="card-body column-body d-flex flex-column gap-2 p-3">
        {visibleTasks.length === 0 ? (
          <div className="text-center text-muted py-5">
            <div className="fs-1 mb-2">📋</div>
            <span className="small">No tasks here yet</span>
          </div>
        ) : (
          visibleTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}

        <div className="drop-zone rounded d-flex align-items-center justify-content-center text-muted small mt-auto">
          Drop here
        </div>

        {hasMore && (
          <button
            className="btn btn-sm btn-outline-secondary w-100 mt-2"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Load more ({tasks.length - visibleCount} remaining)
          </button>
        )}
      </div>

      <div className="card-footer bg-transparent border-top-0 p-3 pt-0">
        <button
          className="btn btn-add-column w-100 py-2 fw-semibold small"
          onClick={() => onAddClick(columnKey)}
          id={`btn-add-${columnKey}`}
        >
          + Add task
        </button>
      </div>
    </div>
  );
}
