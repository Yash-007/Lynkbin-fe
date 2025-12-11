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
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
              {/* Enhanced Logo Icon with Dark Theme */}
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center justify-center shadow-xl shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 overflow-hidden">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-dark/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Link icon with animation */}
                <svg className="relative z-10 w-6 h-6 text-primary group-hover:text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                
                {/* Shine overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Text Logo with gradient */}
              <span className="font-display text-xl font-bold bg-gradient-to-r from-foreground via-primary-light to-foreground bg-clip-text text-transparent tracking-tight group-hover:from-primary group-hover:via-primary-light group-hover:to-primary transition-all duration-300">
                LynkBin
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated ? (
                <>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-primary hover:bg-primary/90 shadow-blur text-sm sm:text-base"
              size="sm"
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
                    size="sm"
                    className="text-sm sm:text-base"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/auth")}
                    className="bg-primary hover:bg-primary/90 shadow-blur text-sm sm:text-base"
                    size="sm"
            >
              Get Started
            </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Creative Layout */}
      <section className="relative z-10 container mx-auto px-4 pt-8 sm:pt-12 md:pt-20 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Main Message */}
            <div className="space-y-5 sm:space-y-6">
              {/* Mobile: Compact Preview Design */}
              <div className="lg:hidden space-y-7">
                {/* Heading - Centered */}
                <div className="text-center space-y-3">
                  <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
                    Everything you find.
                    <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                      One place.
                    </span>
                  </h1>
                </div>

                {/* Compact Preview Cards - Max width centered */}
                <div className="space-y-3 max-w-md mx-auto">
                  {/* LinkedIn */}
                  <div className="group bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-xl p-3.5 border-l-[3px] border-platform-linkedin shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-platform-linkedin/10 rounded-lg shrink-0">
                        <svg className="w-5 h-5 text-platform-linkedin" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-platform-linkedin block mb-0.5">LinkedIn</span>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          Professional posts & articles
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* X/Twitter */}
                  <div className="group bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-xl p-3.5 border-l-[3px] border-platform-twitter shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-platform-twitter/10 rounded-lg shrink-0">
                        <svg className="w-5 h-5 text-platform-twitter" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-platform-twitter block mb-0.5">X / Twitter</span>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          Threads & tweets
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="group bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-xl p-3.5 border-l-[3px] border-blue-500 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-blue-500 block mb-0.5">Your Notes</span>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          Ideas & thoughts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tagline - Centered */}
                <div className="text-center">
                  <p className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                    Save once. Find instantly.
                  </p>
                </div>
              </div>
          
              {/* Desktop Version - Original */}
              <div className="hidden lg:block">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Everything
                  <span className="block">you find.</span>
                  <span className="block bg-gradient-primary bg-clip-text text-transparent">
                    One place.
            </span>
          </h1>
              </div>
              
              {/* Desktop Description */}
              <div className="hidden lg:block space-y-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl tracking-wide">
                <p className="leading-relaxed">
                  <span className="text-foreground font-medium">LinkedIn posts.</span> <span className="text-foreground font-medium">X threads.</span> <span className="text-foreground font-medium">Reddit discussions.</span>
                </p>
                <p className="leading-relaxed">
                  <span className="text-foreground font-medium">Your notes.</span> <span className="text-foreground font-medium">Any link.</span>
                </p>
                <p className="font-display text-xl sm:text-2xl font-semibold text-foreground mt-6">
                  Save once. Find instantly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                {/* Primary CTA - Gradient Button */}
                <Button
                  size="lg"
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                  className="group relative bg-gradient-to-r from-primary via-primary to-primary-light hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] text-base font-semibold px-8 py-6 w-full sm:w-auto overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isAuthenticated ? "Open Dashboard" : "Start For Free"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>

                {/* Secondary CTA - Glass Button */}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
                  className="group relative text-base font-semibold px-8 py-6 bg-card/40 border-2 border-border/60 backdrop-blur-xl hover:bg-card/60 hover:border-primary/50 w-full sm:w-auto transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    Try Telegram Bot
                  </span>
                </Button>
              </div>
            </div>

            {/* Right: Visual Cards - Floating Layout */}
            <div className="relative h-[500px] md:h-[600px] hidden lg:block">
              {/* Card 1 - LinkedIn */}
              <div className="absolute top-0 right-0 w-80 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl rounded-2xl p-6 border-l-4 border-platform-linkedin shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-platform-linkedin" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm font-semibold text-platform-linkedin">LinkedIn</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                  10 lessons from building a startup...
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  By Sarah Chen • Product Design
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Career</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Startup</span>
                </div>
              </div>

              {/* Card 2 - X/Twitter */}
              <div className="absolute top-32 left-0 w-72 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl rounded-2xl p-5 border-l-4 border-platform-twitter shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-platform-twitter" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-sm font-semibold text-platform-twitter">X</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                  Thread: How to write better code
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  By @devmaster • Engineering
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Code</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Tips</span>
                </div>
              </div>

              {/* Card 3 - Personal Notes */}
              <div className="absolute bottom-12 right-12 w-72 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl rounded-2xl p-5 border-l-4 border-blue-500 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-8h8v2H8v-2zm0 4h8v2H8v-2z"/>
                  </svg>
                  <span className="text-sm font-semibold text-blue-500">Personal Notes</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                  Meeting insights & action items
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your thoughts • Ideas
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Notes</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Ideas</span>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-1/3 text-sm text-muted-foreground italic opacity-50">
                All organized. All searchable.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4">
            Bookmarks
            <span className="block">are broken</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            You save. You forget. You never find it again.
          </p>
        </div>
      </section>

      {/* How it Works - Minimal */}
      <section className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {/* Step 1 */}
            <div className="flex gap-4 sm:gap-6 md:gap-8 items-start group">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">1</span>
              </div>
              <div className="flex-1 pt-1 sm:pt-2">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Save
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Via dashboard or Telegram bot. Paste links or write notes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 sm:gap-6 md:gap-8 items-start group">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">2</span>
              </div>
              <div className="flex-1 pt-1 sm:pt-2">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Forget about it
            </h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  We auto-organize by platform, author, topic & tags.
            </p>
          </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 sm:gap-6 md:gap-8 items-start group">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">3</span>
              </div>
              <div className="flex-1 pt-1 sm:pt-2">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Find it instantly
            </h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Search anything. Filter by platform, author, or tag.
            </p>
          </div>
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Stop losing
            <span className="block">great content</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary CTA - Enhanced Gradient Button */}
            <Button
              size="lg"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              className="group relative bg-gradient-to-r from-primary via-primary to-primary-light hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] text-base sm:text-lg font-bold px-10 sm:px-12 py-7 sm:py-8 w-full sm:w-auto overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isAuthenticated ? "Open Dashboard" : "Start Free"}
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              {/* Animated shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-6 text-xs sm:text-sm text-muted-foreground flex-wrap">
            <span>No credit card</span>
            <span>•</span>
            <span>Free forever</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/20 backdrop-blur-xl py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate("/")}>
              {/* Footer Logo - Dark Theme */}
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center justify-center shadow-lg shadow-primary/15 group-hover:shadow-primary/30 transition-all duration-300">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-dark/10 opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Link icon */}
                <svg className="relative z-10 w-5 h-5 text-primary group-hover:text-primary-light transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              
              <span className="font-display font-bold bg-gradient-to-r from-foreground via-primary-light to-foreground bg-clip-text text-transparent tracking-tight text-sm sm:text-base group-hover:from-primary group-hover:via-primary-light group-hover:to-primary transition-all duration-300">
                LynkBin
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <button 
                onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
                className="hover:text-foreground transition-all duration-200 hover:underline underline-offset-4"
              >
                Telegram
              </button>
              <button 
                onClick={() => navigate("/auth")}
                className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground font-medium transition-all duration-200 hover:scale-105"
              >
                Login
              </button>
            </div>

            <div className="text-xs sm:text-sm">© 2024</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
