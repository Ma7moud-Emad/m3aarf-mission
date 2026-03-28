import type { ConfirmDialogProps } from "../types";
import { MdWarning } from "react-icons/md";

export default function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1070, cursor: "pointer" }}
      onClick={onCancel}
    >
      <div
        className="modal-body-animate bg-white rounded-3 shadow-lg p-4 text-center"
        style={{ width: "100%", maxWidth: 380, cursor: "default" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
          style={{ width: 48, height: 48 }}
        >
          <MdWarning size={24} className="text-danger" />
        </div>

        <p className="mb-4">{message}</p>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary flex-fill"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="btn btn-danger flex-fill" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
