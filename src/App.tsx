import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { useStore } from "./store/store";

import type { ColumnKey, Task } from "./types";

import Header from "./components/Header";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";

const COLUMNS: { title: string; key: ColumnKey }[] = [
  { title: "Backlog", key: "backlog" },
  { title: "In Progress", key: "in_progress" },
  { title: "Review", key: "review" },
  { title: "Done", key: "done" },
];

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [defaultColumn, setDefaultColumn] = useState<ColumnKey | undefined>();

  const { tasks, isPending, addTask, moveTask } = useTasks();

  const search = useStore((s) => s.search);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddClick = (col?: ColumnKey) => {
    setDefaultColumn(col);
    setIsFormOpen(true);
  };

  const handleDrop = (taskId: string, targetColumn: ColumnKey) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.column !== targetColumn) {
      moveTask({ id: taskId, column: targetColumn });
    }
  };

  /* Loading skeleton */
  if (isPending) {
    return (
      <>
        <Header count={0} />
        <div className="row g-3">
          {COLUMNS.map((col) => (
            <div key={col.key} className="col-lg-3 col-md-6 col-12">
              <div className="card border" id={`column-${col.key}`}>
                <div className="card-header bg-transparent d-flex align-items-center gap-2 py-3">
                  <span className={`col-dot col-dot--${col.key}`} />
                  <span className="fw-bold text-uppercase small text-secondary">
                    {col.title}
                  </span>
                </div>
                <div className="card-body d-flex flex-column gap-2">
                  <div className="skeleton-card" />
                  <div className="skeleton-card" />
                  <div className="skeleton-card" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Header count={tasks.length} />

      {/* Board */}
      <main className="row g-3">
        {COLUMNS.map((col) => (
          <div key={col.key} className="col-lg-3 col-md-6 col-12">
            <Column
              title={col.title}
              columnKey={col.key}
              tasks={filteredTasks.filter((t) => t.column === col.key)}
              onAddClick={handleAddClick}
              onDrop={handleDrop}
            />
          </div>
        ))}
      </main>

      {/* Create task */}
      {isFormOpen && (
        <TaskForm
          onSubmit={(data: Task) => addTask(data)}
          setIsOpen={setIsFormOpen}
          defaultColumn={defaultColumn}
        />
      )}
    </>
  );
}
