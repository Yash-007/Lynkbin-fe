import { ArrowLeft, Link2, Grid3x3, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "getting-started",
      title: "About LynkBin",
      icon: Link2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      content: [
        {
          question: "What is LynkBin?",
          answer: "Your personal knowledge vault for organizing links from LinkedIn, X, Reddit, Instagram, and Facebook. Save, organize, and discover valuable content in one place."
        },
        {
          question: "Key Features",
          answer: "• Auto-extract metadata (titles, authors, tags)\n• Filter by platform, author, tags, and categories\n• Multiple save options: manual, browser, or Telegram bot\n• Free and unlimited"
        }
      ]
    },
    {
      id: "telegram-bot",
      title: "Telegram Bot",
      icon: MessageSquare,
      color: "text-[#0088cc]",
      bgColor: "bg-[#0088cc]/10",
      borderColor: "border-[#0088cc]/20",
      content: [
        {
          question: "How to use the Telegram Bot",
          answer: "1. Search @lynkbin_bot on Telegram\n2. Click 'Start'\n3. Login \n4. Send any link from supported platforms\n5. Access it in your dashboard"
        },
        {
          question: "Supported Platforms",
          answer: "LinkedIn • X/Twitter • Reddit • Instagram • Facebook"
        },
      ]
    },
    {
      id: "features",
      title: "How It Works",
      icon: Grid3x3,
      color: "text-accent-blue",
      bgColor: "bg-accent-blue/10",
      borderColor: "border-accent-blue/20",
      content: [
        {
          question: "Organizing Links",
          answer: "Links are auto-organized by platform, category, author, and tags. Use multi-select filters to find exactly what you need."
        },
        {
          question: "Adding Links",
          answer: "Three ways to save:\n• Telegram bot (fastest)\n• 'Add Link' button (manual)\n• Browser extension (coming soon)"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Help Center</h1>
              <p className="text-xs text-muted-foreground">Everything you need to know</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl pb-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-primary/10 via-accent-blue/10 to-primary/5 backdrop-blur-xl rounded-2xl p-6 border border-primary/30 mb-6">
          <div className="flex items-start gap-4">
            {/* Enhanced Logo Icon with Dark Theme */}
            <div className="relative flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center justify-center shadow-xl shadow-primary/20 overflow-hidden">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-dark/10 opacity-60"></div>
              
              {/* Link icon */}
              <svg className="relative z-10 w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              
              {/* Shine overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-50"></div>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold bg-gradient-to-r from-foreground via-primary-light to-foreground bg-clip-text text-transparent tracking-tight mb-1">Welcome to LynkBin</h2>
              <p className="text-sm text-muted-foreground">
                Save, organize, and discover valuable links from social media. Quick answers below.
              </p>
            </div>
          </div>
        </div>

        {/* Telegram Bot Quick Action */}
        <div className="bg-gradient-to-br from-[#0088cc]/10 via-[#229ED9]/5 to-[#0088cc]/5 backdrop-blur-xl rounded-xl p-4 border border-[#0088cc]/30 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0088cc] to-[#229ED9] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm">Try Telegram Bot</p>
                <p className="text-xs text-muted-foreground truncate">Save links instantly</p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
              className="bg-[#0088cc] hover:bg-[#0077b3] text-white flex-shrink-0"
            >
              Open
            </Button>
          </div>
        </div>

        {/* Help Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-6">
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-9 h-9 rounded-lg ${section.bgColor} flex items-center justify-center border ${section.borderColor}`}>
                <section.icon className={`w-4 h-4 ${section.color}`} />
              </div>
              <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
            </div>

            <div className="space-y-3">
              {section.content.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-card/50 backdrop-blur-xl rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <h3 className="font-semibold text-sm text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-card/50 backdrop-blur-xl rounded-xl p-5 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground mb-3">Need more help?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
              className="bg-[#0088cc]/10 border-[#0088cc]/30 hover:bg-[#0088cc]/20 text-[#0088cc]"
            >
              <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              Telegram
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-card/50 border-border/50 hover:bg-card/80"
              onClick={() => window.location.href = 'mailto:yashagrawal.30.08@gmail.com'}
            >
              Email
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;

