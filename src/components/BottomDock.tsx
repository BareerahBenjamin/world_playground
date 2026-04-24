import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IconSpark, IconMountain, IconScroll } from "@/components/HandIcon";

const DOCK_ITEMS = [
  { to: "/home",    label: "Playground", Icon: IconSpark    },
  { to: "/goals",   label: "Goals",      Icon: IconMountain },
  { to: "/records", label: "Records",    Icon: IconScroll   },
] as const;

export default function BottomDock() {
  const location = useLocation();
  return (
    <nav className="flex-none relative z-40 h-16 flex items-stretch bg-card/95 backdrop-blur border-t-2 border-foreground">
      {DOCK_ITEMS.map(({ to, label, Icon }) => {
        const active = location.pathname.startsWith(to);
        return (
          <NavLink
            key={to}
            to={to}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 transition-colors",
              active ? "bg-foreground text-background" : "text-foreground hover:bg-secondary",
            )}
          >
            <Icon size={20} />
            <span className="font-hand text-[10px] leading-none">{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
