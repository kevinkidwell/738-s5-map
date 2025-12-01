export default function ShadeSwatch({
  shade,
  onClick,
}: {
  shade: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="btn btn-light d-inline-flex flex-column align-items-center"
      onClick={onClick}
      style={{ width: 80 }}
    >
      <span className="rounded mb-1" style={{ width: "100%", height: 20, backgroundColor: shade }} />
      <small className="text-muted">{shade}</small>
    </button>
  );
}
