import { useEffect, useState } from "react";
import { Toast } from "bootstrap";
import AllianceForm from "./AllianceForm";
import AllianceTable from "./AllianceTable";
import { addAlliance, updateAllianceShade } from "../services/alliances.server";
import { subscribeAlliances } from "../services/alliances.client";
import type { Alliance } from "../services/alliances.server";

export default function AllianceManager({ readOnly = false }: { readOnly?: boolean }) {
  const [alliances, setAlliances] = useState<Alliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const unsub = subscribeAlliances((data) => {
      setAlliances(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(message);
    setToastType(type);
    const toastEl = document.getElementById("statusToast");
    if (toastEl) {
      const bsToast = new Toast(toastEl);
      bsToast.show();
    }
  };

  const handleAddAlliance = async (name: string, shades: string[]) => {
    try {
      if (!readOnly) {
        await addAlliance(name, shades);
        showToast("Alliance added successfully.", "success");
      }
    } catch {
      showToast("Error adding alliance.", "error");
    }
  };

  const handleEditShade = async (id: string, index: number, newColor: string) => {
    try {
      if (!readOnly) {
        await updateAllianceShade(id, index, newColor);
        showToast("Shade updated successfully.", "success");
      }
    } catch {
      showToast("Error updating shade.", "error");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 m-0">Alliance Manager</h1>
        <span
          className={`badge ${readOnly ? "bg-secondary" : "bg-success"}`}
          aria-label={readOnly ? "Read-only mode" : "Editing enabled"}
        >
          {readOnly ? "Read-Only" : "Editing Enabled"}
        </span>
      </div>
      <p className="text-muted">
        Manage alliances and their symbolic shades. All changes are saved automatically.
      </p>

      {!readOnly && (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="h5">Add New Alliance</h2>
            <AllianceForm
              onSubmit={handleAddAlliance}
              existingNames={alliances.map((a) => a.name.toLowerCase())}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5" aria-live="polite">
          <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
          <p className="mt-3">Loading alliances…</p>
        </div>
      ) : (
        <AllianceTable alliances={alliances} onEditShade={handleEditShade} readOnly={readOnly} />
      )}

      {/* Toast container */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="statusToast"
          className={`toast align-items-center text-bg-${
            toastType === "success" ? "success" : toastType === "error" ? "danger" : "info"
          } border-0`}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
