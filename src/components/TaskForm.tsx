import { useForm, type SubmitHandler } from "react-hook-form";
import type { Task, TaskFormProps } from "../types";

export default function TaskForm({
  onSubmit,
  setIsOpen,
  initialData,
  defaultColumn,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    defaultValues:
      initialData ??
      ({
        column: defaultColumn || "",
      } as Partial<Task> as Task),
  });

  const submitHandler: SubmitHandler<Task> = (data) => {
    const taskData: Task = {
      ...data,
      id: data.id || crypto.randomUUID(),
    };
    onSubmit(taskData);
    reset();
    setIsOpen(false);
  };

  return (
    <div
      className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1060, cursor: "pointer" }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="modal-body-animate bg-white rounded-3 shadow-lg p-4"
        style={{ width: "100%", maxWidth: 480, cursor: "default" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="fw-bold mb-3">
          {initialData ? "Edit Task" : "New Task"}
        </h5>

        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Title */}
          <div className="mb-3">
            <label
              htmlFor="task-title"
              className="form-label fw-semibold small text-secondary text-uppercase"
            >
              Title
            </label>
            <input
              id="task-title"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              placeholder="Enter task title…"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label
              htmlFor="task-description"
              className="form-label fw-semibold small text-secondary text-uppercase"
            >
              Description
            </label>
            <textarea
              id="task-description"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Describe the task…"
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <div className="invalid-feedback">
                {errors.description.message}
              </div>
            )}
          </div>

          {/* Column */}
          <div className="mb-3">
            <label
              htmlFor="task-column"
              className="form-label fw-semibold small text-secondary text-uppercase"
            >
              Column
            </label>
            <select
              id="task-column"
              className={`form-select ${errors.column ? "is-invalid" : ""}`}
              {...register("column", { required: "Column is required" })}
            >
              <option value="">Select column</option>
              <option value="backlog">Backlog</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
            {errors.column && (
              <div className="invalid-feedback">{errors.column.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold py-2"
          >
            {initialData ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
