import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HelpCircleIcon, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/", title: "Home", icon: HomeIcon },
  {
    href: "/faq",
    title: "FAQ",
    icon: HelpCircleIcon,
  },
];

export const additionalLinks: AdditionalLinks[] = [];
