export enum SectionId {
  ENTRY = 0,
  MANIFESTO = 1,
  GAME = 2,
  FUNDING = 3,
  INTEGRITY = 4,
  CONTACT = 5
}

export interface NavNode {
  id: SectionId;
  label: string;
  path: string;
}

export const SECTIONS: NavNode[] = [
  { id: SectionId.ENTRY, label: "SIGNAL DETECTED", path: "/" },
  { id: SectionId.MANIFESTO, label: "PHILOSOPHY", path: "/studio" },
  { id: SectionId.GAME, label: "NULL VECTOR", path: "/null-vector" },
  { id: SectionId.FUNDING, label: "WAR EFFORT", path: "/funding" },
  { id: SectionId.INTEGRITY, label: "INTEGRITY", path: "/integrity" },
  { id: SectionId.CONTACT, label: "OPEN CHANNEL", path: "/contact" },
];