import { Home, Grid3x3, Plus, Layers } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const platforms = [
  { name: "LinkedIn", value: "linkedin", icon: "💼" },
  { name: "X (Twitter)", value: "twitter", icon: "𝕏" },
  { name: "Reddit", value: "reddit", icon: "🔴" },
  { name: "Instagram", value: "instagram", icon: "📷" },
  { name: "Facebook", value: "facebook", icon: "👍" },
];

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileBottomNav = ({ activeTab, onTabChange }: MobileBottomNavProps) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-background/80 backdrop-blur-lg border-t border-border/50 px-2 pb-safe">
        <div className="flex items-center justify-around h-16">
          {/* Platform Switcher */}
          <Sheet>
            <SheetTrigger asChild>
              <button className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors",
                isDashboard && "text-primary"
              )}>
                <Layers className="w-5 h-5" />
                <span className="text-[10px] font-medium">Platforms</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background/95 backdrop-blur-xl border-border/50">
              <SheetHeader>
                <SheetTitle className="text-left">Select Platform</SheetTitle>
              </SheetHeader>
              <div className="grid gap-2 py-4">
                {platforms.map((platform) => (
                  <Button
                    key={platform.value}
                    variant={activeTab === platform.value ? "default" : "ghost"}
                    className={cn(
                      "justify-start h-12 text-left",
                      activeTab === platform.value && "bg-primary/10 text-primary border border-primary/20"
                    )}
                    onClick={() => onTabChange(platform.value)}
                  >
                    <span className="text-xl mr-3">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Categories View */}
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors",
                isActive && "text-primary"
              )
            }
          >
            <Grid3x3 className="w-5 h-5" />
            <span className="text-[10px] font-medium">Categories</span>
          </NavLink>

          {/* Add Link - Center */}
          <NavLink
            to="/paste"
            className="flex items-center justify-center w-14 h-14 -mt-6 rounded-full bg-gradient-to-br from-primary via-purple-500 to-blue-500 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all"
          >
            <Plus className="w-6 h-6" />
          </NavLink>

          {/* Dashboard Home */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors",
                isActive && "text-primary"
              )
            }
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </NavLink>

          {/* Saved/Bookmarks placeholder */}
          <button className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors opacity-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="text-[10px] font-medium">Saved</span>
          </button>
        </div>
      </div>
    </div>
  );
};
