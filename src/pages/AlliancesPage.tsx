import React, { useState, useEffect } from "react";
import { useApp } from "../store/useApp";
import { generateAllianceShades } from "../utils/color";

const milestoneLabels = [
  "Stronghold First Capture",
  "Stronghold Final Capture",
  "City First Capture",
  "City Final Capture",
];

const AlliancesPage: React.FC<{ dataSource: "live" | "published" }> = ({ dataSource }) => {
  const { alliances, publishedData, subscribeAlliances, upsertAlliance, overwriteAllianceShade } = useApp();
  const allianceList = dataSource === "live" ? alliances : publishedData?.alliances || [];

  const [allianceName, setAllianceName] = useState("");
  const [allianceColor, setAllianceColor] = useState("#9370DB");
  const [livePreviewShades, setLivePreviewShades] = useState<string[]>(generateAllianceShades("#9370DB"));

  const [editing, setEditing] = useState<{ allianceId: string; shadeIndex: number } | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    subscribeAlliances(); // listen for live updates
  }, [subscribeAlliances]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allianceName.trim()) return;
    await upsertAlliance(allianceName, allianceColor);
    setAllianceName("");
    setAllianceColor("#9370DB");
    setLivePreviewShades(generateAllianceShades("#9370DB"));
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Alliance Manager</h1>

      {dataSource === "live" && (
        <>
          <h2 className="h5 mb-3">Add Alliance</h2>
          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Alliance Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={allianceName}
                  onChange={(e) => setAllianceName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Base Color (Hex)</label>
                <input
                  type="text"
                  className="form-control"
                  value={allianceColor}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setAllianceColor(newColor);
                    setLivePreviewShades(generateAllianceShades(newColor));
                  }}
                />
              </div>
            </div>

            {livePreviewShades.length === 4 && (
              <div className="row mt-3">
                {livePreviewShades.map((shade, i) => (
                  <div key={i} className="col-md-3 d-flex flex-column align-items-center">
                    <small className="text-muted mb-1">{milestoneLabels[i]}</small>
                    <div
                      className="rounded mb-1"
                      style={{ width: "100%", height: "40px", backgroundColor: shade }}
                    />
                    <small>{shade}</small>
                  </div>
                ))}
              </div>
            )}

            <div className="row mt-3">
              <div className="col-md-12">
                <button type="submit" className="btn btn-dark add-alliance-btn w-100">
                  Add Alliance
                </button>
              </div>
            </div>
          </form>
          <hr className="my-5" />
        </>
      )}

      <h2 className="h5 mb-3">Alliance List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            {milestoneLabels.map((label, i) => (
              <th key={i} className="text-center">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allianceList.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              {Array.isArray(a.shades) ? (
                a.shades.map((shade, i) => {
                  const isEditing = editing?.allianceId === a.id && editing?.shadeIndex === i;
                  return (
                    <td key={i} className="text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={async () => {
                            await overwriteAllianceShade(a.id, i, editValue);
                            setEditing(null);
                          }}
                          onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                              await overwriteAllianceShade(a.id, i, editValue);
                              setEditing(null);
                            }
                          }}
                          className="form-control form-control-sm text-center"
                          autoFocus
                        />
                      ) : (
                        <div
                          className="d-flex flex-column align-items-center cursor-pointer"
                          onClick={() => {
                            setEditing({ allianceId: a.id, shadeIndex: i });
                            setEditValue(shade);
                          }}
                        >
                          <div
                            className="rounded mb-1"
                            style={{ width: "40px", height: "20px", backgroundColor: shade }}
                          />
                          <small>{shade}</small>
                        </div>
                      )}
                    </td>
                  );
                })
              ) : (
                <td colSpan={4} className="text-center text-muted">
                  No shades defined
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlliancesPage;
