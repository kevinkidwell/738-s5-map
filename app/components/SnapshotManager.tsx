import { useState } from "react";

type Snapshot = {
  id: string;
  name: string;
  createdAt: string;
};

export default function SnapshotManager() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);

  const handleAddSnapshot = () => {
    const newSnapshot: Snapshot = {
      id: crypto.randomUUID(),
      name: `Snapshot ${snapshots.length + 1}`,
      createdAt: new Date().toLocaleString(),
    };
    setSnapshots((prev) => [...prev, newSnapshot]);
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Snapshots</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={handleAddSnapshot}
      >
        Add Snapshot
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {snapshots.map((snapshot) => (
            <tr key={snapshot.id}>
              <td>{snapshot.name}</td>
              <td>{snapshot.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
