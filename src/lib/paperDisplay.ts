// Every paper gets a short citation-style ID, e.g. [SA-0142], derived from
// its Mongo ObjectId — no extra DB field needed, and it's stable forever.
export function citationId(id: string): string {
  const numeric = parseInt(id.slice(-6), 16) % 10000;
  return `SA-${numeric.toString().padStart(4, "0")}`;
}

// Cycles a small curated palette across research fields so each field reads
// as its own "index tab" color, consistently, without a manual mapping table.
const FIELD_COLORS = [
  { border: "#2F6E5B", text: "text-teal", label: "teal" },
  { border: "#D98E2B", text: "text-amber-dark", label: "amber" },
  { border: "#5B4B8A", text: "text-[#5B4B8A]", label: "plum" },
  { border: "#3D6A8A", text: "text-[#3D6A8A]", label: "steel" },
];

export function fieldColor(field: string) {
  let hash = 0;
  for (let i = 0; i < field.length; i++) hash = (hash + field.charCodeAt(i)) % FIELD_COLORS.length;
  return FIELD_COLORS[hash];
}
