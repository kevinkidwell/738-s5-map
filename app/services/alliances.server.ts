// app/services/alliances.server.ts
export type Alliance = {
  id: string;
  name: string;
  shades: string[]; // [base, light, medium, dark]
};

// Temporary in‑memory store
let alliances: Alliance[] = [
  {
    id: "1",
    name: "Northern Coalition",
    shades: ["#3B82F6", "#93C5FD", "#2563EB", "#1E40AF"],
  },
  {
    id: "2",
    name: "Eastern Federation",
    shades: ["#10B981", "#6EE7B7", "#059669", "#047857"],
  },
  {
    id: "3",
    name: "Western Union",
    shades: ["#8B5CF6", "#C4B5FD", "#7C3AED", "#6D28D9"],
  },
];

export async function getAlliances(): Promise<Alliance[]> {
  return alliances;
}

export async function addAlliance(name: string, shades: string[]): Promise<Alliance> {
  const newAlliance: Alliance = {
    id: crypto.randomUUID(),
    name,
    shades,
  };
  alliances.push(newAlliance);
  return newAlliance;
}

export async function updateAllianceShade(
  id: string,
  shadeKey: "base" | "light" | "medium" | "dark",
  newColor: string
): Promise<Alliance | null> {
  const index = alliances.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const shadeIndex =
    shadeKey === "base" ? 0 : shadeKey === "light" ? 1 : shadeKey === "medium" ? 2 : 3;

  alliances[index].shades[shadeIndex] = newColor;
  return alliances[index];
}

export async function deleteAlliance(id: string): Promise<boolean> {
  const before = alliances.length;
  alliances = alliances.filter((a) => a.id !== id);
  return alliances.length < before;
}
