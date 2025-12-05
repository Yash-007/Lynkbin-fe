import { useState } from "react";
import { ArrowLeft, Shield, HelpCircle, LogOut, Sparkles, Link2, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { cn } from "@/lib/utils";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab] = useState("linkedin");
  
  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "AJ",
    memberSince: "Jan 2024",
    totalLinks: 156,
    platforms: 5,
    categories: 8,
  };

  const stats = [
    { label: "Total Links", value: userData.totalLinks, icon: Link2, color: "text-primary" },
    { label: "Platforms", value: userData.platforms, icon: Globe, color: "text-accent-blue" },
    { label: "Categories", value: userData.categories, icon: BarChart3, color: "text-platform-instagram" },
  ];

  const menuSections: Array<{
    title: string;
    items: Array<{
      icon: any;
      label: string;
      description: string;
      badge?: string;
    }>;
  }> = [
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", description: "Get help and support" },
        { icon: Shield, label: "Privacy & Security", description: "Manage your data" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Profile</h1>
              <p className="text-xs text-muted-foreground">Manage your account</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/30">
                {userData.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">{userData.name}</h2>
              <p className="text-muted-foreground text-sm mb-2">{userData.email}</p>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Member since {userData.memberSince}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-4 hover:border-primary/30 transition-all"
            >
              <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3", 
                stat.color === "text-primary" ? "from-primary/20 to-primary/5" : 
                stat.color === "text-accent-blue" ? "from-accent-blue/20 to-accent-blue/5" : 
                "from-platform-instagram/20 to-platform-instagram/5"
              )}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left",
                    itemIndex !== section.items.length - 1 && "border-b border-border/50"
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {item.badge}
                    </Badge>
                  )}
                  <svg className="w-5 h-5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden mb-6">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-destructive/10 transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-destructive">Log Out</p>
              <p className="text-sm text-muted-foreground">Sign out of your account</p>
            </div>
          </button>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground">
          <p>LynkBin v1.0.0</p>
          <p className="text-xs mt-1">Made with 💜 for knowledge seekers</p>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} onTabChange={() => {}} />
    </div>
  );
};

export default Profile;

