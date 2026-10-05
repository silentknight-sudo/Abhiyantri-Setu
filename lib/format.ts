export function formatINR(amount: number | null | undefined): string {
  if (amount == null) return "—";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function initials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function timeAgo(date: Date | string): string {
  const diff = Math.max(0, Date.now() - new Date(date).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export const SPECIALTIES = [
  "Architect",
  "Contractor",
  "Interior Designer",
  "Electrician",
  "Plumber",
  "Painter",
  "Civil Engineer",
  "Mason",
];
