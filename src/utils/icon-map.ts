import type { ComponentType, SVGProps } from "react";
import { House, MessageCircle, Settings, User, type LucideIcon } from "lucide-react";

export const ICON_MAP = {
  house: House,
  user: User,
  message: MessageCircle,
  settings: Settings,
};

export type IconName = keyof typeof ICON_MAP;

export const getIcon = (
  iconName: IconName,
): LucideIcon | ComponentType<SVGProps<SVGSVGElement>> => {
  return ICON_MAP[iconName];
};
