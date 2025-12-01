import AllianceForm from "./AllianceForm";
import AllianceTable from "./AllianceTable";

export default function AllianceManager({
  alliances,
  onAddAlliance,
  onEditShade,
}: {
  alliances: { id: string; name: string; shades: string[] }[];
  onAddAlliance: (name: string, shades: string[]) => Promise<void>;
  onEditShade: (id: string, index: number, newColor: string) => Promise<void>;
}) {
  return (
    <div>
      <AllianceForm onSubmit={onAddAlliance} />
      <AllianceTable alliances={alliances} onEditShade={onEditShade} />
    </div>
  );
}
