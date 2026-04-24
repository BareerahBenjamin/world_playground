import { NavLink, Outlet, useLocation } from "react-router-dom";
import { PLAYER } from "@/data/world";
import { cn } from "@/lib/utils";
import BottomDock from "@/components/BottomDock";

export default function AppLayout() {
  const location = useLocation();
  return (
    <div className="h-[100dvh] flex flex-col relative z-0 overflow-hidden bg-background">
      <header className="flex-none z-40 flex items-center justify-between px-4 md:px-10 h-16 border-b-2 border-foreground bg-card/95 backdrop-blur">
        <div className="flex items-baseline gap-2 md:gap-3 min-w-0">
          <h1 className="font-serif-en text-base md:text-xl tracking-wide truncate">
            World · Playground
          </h1>
          <span className="font-hand text-sm md:text-base text-muted-foreground hidden sm:inline">
            世界是一个游乐场
          </span>
        </div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 md:gap-3 pl-2 pr-1 md:pr-3 py-1 rounded-sm border-2 transition-colors",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-transparent hover:border-foreground/40",
            )
          }
        >
          <div className="hidden md:flex flex-col gap-0.5 items-end">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              XP
            </span>
            <div className="w-20 h-1.5 border border-foreground bg-secondary overflow-hidden rounded-sm">
              <div
                className="h-full bg-accent"
                style={{ width: `${(PLAYER.xp / PLAYER.xpMax) * 100}%` }}
              />
            </div>
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-foreground bg-accent flex items-center justify-center font-serif-en text-xs font-bold">
            {PLAYER.level}
          </div>
        </NavLink>
      </header>

      <main key={location.pathname} className="flex-1 overflow-y-auto relative z-0 paper-in p-0">
        <Outlet />
      </main>

      <BottomDock />
    </div>
  );
}
