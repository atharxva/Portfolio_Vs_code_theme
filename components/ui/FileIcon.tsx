import {
  Home,
  Briefcase,
  Braces,
  FolderOpen,
  Mail,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { FileId } from "@/lib/types";

const ICON_MAP: Record<FileId, { icon: LucideIcon; color: string }> = {
  welcome: { icon: Home, color: "#4da6ff" },
  experience: { icon: Briefcase, color: "#e3b341" },
  skills: { icon: Braces, color: "#f5c542" },
  projects: { icon: FolderOpen, color: "#dcb67a" },
  contact: { icon: Mail, color: "#79c0ff" },
  education: { icon: GraduationCap, color: "#7ee2b8" },
};

export function FileIcon({
  id,
  size = 16,
}: {
  id: FileId;
  size?: number;
}) {
  const entry = ICON_MAP[id];
  if (!entry) return null;
  const Icon = entry.icon;
  return <Icon size={size} color={entry.color} strokeWidth={2} />;
}
