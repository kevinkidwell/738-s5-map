import Map from "./map";

export default function PublicMap() {
  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Public Map</h1>
      <p className="text-muted">
        This is a read‑only view of the alliance map. Editing is disabled.
      </p>
      <Map />
    </div>
  );
}
