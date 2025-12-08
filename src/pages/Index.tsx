import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-glow pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center shadow-lg shadow-primary/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-40"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                LynkBin
              </span>
            </div>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-primary hover:bg-primary/90 shadow-blur"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={() => navigate("/profile")}
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex hover:bg-muted/50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/auth")}
                    variant="ghost"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/auth")}
                    className="bg-primary hover:bg-primary/90 shadow-blur"
            >
              Get Started
            </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Your Personal Knowledge Vault
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Save, Organize & Discover
            <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent">
              Your Best Links
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Transform scattered links from LinkedIn and X into a beautifully organized, 
            searchable collection. Never lose valuable content again.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-glow"
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Organizing Free"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/paste")}
              className="text-lg px-8 py-6 bg-card/30 border-border/50 backdrop-blur-xl hover:bg-card/50"
            >
              Try Paste Bin
            </Button>
          </div>

          {/* Telegram Bot CTA */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 via-accent-blue/10 to-primary/5 backdrop-blur-xl rounded-2xl p-6 border border-primary/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#0088cc] to-[#229ED9] flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-foreground mb-1">Save Links via Telegram Bot</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Simply forward any link to our Telegram bot and it'll be automatically saved to your vault. Quick, easy, and always accessible!
                  </p>
                  <Button
                    size="sm"
                    className="bg-[#0088cc] hover:bg-[#0077b3] text-white shadow-md"
                    onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    Open Telegram Bot
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-card/30 backdrop-blur-xl rounded-2xl p-8 border border-border/50 shadow-blur hover:shadow-glow hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Auto-Extract Metadata
            </h3>
            <p className="text-muted-foreground">
              Automatically capture titles, authors, tags, and categories from every link you save. 
              No manual work required.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-xl rounded-2xl p-8 border border-border/50 shadow-blur hover:shadow-glow hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
              <LinkIcon className="w-6 h-6 text-accent-blue" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#0088cc]/10 flex items-center justify-center border border-[#0088cc]/20">
                <svg className="w-5 h-5 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Multiple Save Options
            </h3>
            <p className="text-muted-foreground">
              Save via browser extension, paste manually, or send through Telegram bot. 
              Your choice, your workflow.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-xl rounded-2xl p-8 border border-border/50 shadow-blur hover:shadow-glow hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Smart Search & Filter
            </h3>
            <p className="text-muted-foreground">
              Find any link instantly with powerful search and intelligent filters. 
              Your knowledge, perfectly organized.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-primary rounded-3xl p-12 text-center shadow-glow">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands who've transformed their link chaos into organized knowledge.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6"
          >
            Start Free Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-xl py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 LinkyBin. Your links, beautifully organized.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
