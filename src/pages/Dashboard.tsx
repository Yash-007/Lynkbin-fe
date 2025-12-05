import { useState, useEffect } from "react";
import { Plus, Link as LinkIcon, ExternalLink, Tag, X, Grid3x3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { cn } from "@/lib/utils";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  author: string;
  platform: "linkedin" | "twitter" | "reddit" | "instagram" | "facebook";
  tags: string[];
  category: string;
  savedAt: string;
}

const mockLinks: LinkItem[] = [
  {
    id: "1",
    title: "The Future of AI in Product Design",
    url: "https://linkedin.com/pulse/future-ai-design",
    description: "Exploring how artificial intelligence is revolutionizing the way we approach product design and user experience.",
    author: "Sarah Chen",
    platform: "linkedin",
    tags: ["AI", "Design"],
    category: "Design",
    savedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Building Scalable Microservices",
    url: "https://linkedin.com/pulse/microservices-arch",
    description: "Best practices for designing and implementing microservices architecture in modern applications.",
    author: "Mike Johnson",
    platform: "linkedin",
    tags: ["Architecture", "Backend"],
    category: "Engineering",
    savedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "10 Tips for Better React Performance",
    url: "https://twitter.com/dev/status/123",
    description: "Essential optimization techniques every React developer should know to build faster applications.",
    author: "@devexpert",
    platform: "twitter",
    tags: ["React", "Performance"],
    category: "Development",
    savedAt: "2024-01-14",
  },
  {
    id: "4",
    title: "The State of Web3 in 2024",
    url: "https://twitter.com/crypto/status/456",
    description: "Analysis of current trends and future predictions for blockchain and decentralized technologies.",
    author: "@web3insights",
    platform: "twitter",
    tags: ["Web3", "Blockchain"],
    category: "Technology",
    savedAt: "2024-01-13",
  },
  {
    id: "5",
    title: "Leadership Lessons from Tech Giants",
    url: "https://linkedin.com/pulse/leadership-tech",
    description: "Key takeaways from successful leaders in the technology industry.",
    author: "Emma Davis",
    platform: "linkedin",
    tags: ["Leadership", "Career"],
    category: "Business",
    savedAt: "2024-01-12",
  },
  {
    id: "6",
    title: "CSS Grid vs Flexbox: When to Use What",
    url: "https://twitter.com/css/status/789",
    description: "Practical guide to choosing between CSS Grid and Flexbox for your layouts.",
    author: "@csswizard",
    platform: "twitter",
    tags: ["CSS", "WebDev"],
    category: "Development",
    savedAt: "2024-01-11",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return (localStorage.getItem("selectedPlatform") as string) || "linkedin";
  });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const navigate = useNavigate();

  // Save selected platform to localStorage for Categories page
  useEffect(() => {
    localStorage.setItem("selectedPlatform", activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset filters when switching platforms
    setSelectedAuthors([]);
    setSelectedTags([]);
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev => 
      prev.includes(author) 
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // For platform view - filter by platform, author, and tag
  const platformFilteredLinks = mockLinks.filter((link) => {
    const matchesPlatform = link.platform === activeTab;
    const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(link.author);
    const matchesTag = selectedTags.length === 0 || link.tags.some(tag => selectedTags.includes(tag));
    return matchesPlatform && matchesAuthor && matchesTag;
  });

  // Get available authors and tags for current platform
  const platformLinks = mockLinks.filter(link => link.platform === activeTab);
  const availableAuthors = Array.from(new Set(platformLinks.map(link => link.author))).sort();
  const availableTags = Array.from(new Set(platformLinks.flatMap(link => link.tags))).sort();


  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Gradient overlay at top */}
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-glow pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center shadow-lg shadow-primary/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-40"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  LynkBin
                </h1>
                <p className="text-[10px] text-muted-foreground -mt-0.5">Your Knowledge Hub</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button 
                onClick={() => navigate("/categories")} 
                variant="outline"
                className="bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-xl"
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                Categories
              </Button>
              <Button 
                onClick={() => navigate("/paste")} 
                className="bg-primary hover:bg-primary/90 shadow-blur"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
              <Button 
                onClick={() => navigate("/profile")}
                variant="ghost"
                size="icon"
                className="hover:bg-muted/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Desktop - Platform Tabs */}
        <div className="hidden md:block">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
              {/* Platform Tabs */}
              <div className="overflow-x-auto scrollbar-hide">
                <TabsList className="bg-card/50 border border-border/50 backdrop-blur-xl p-1.5 shadow-blur inline-flex gap-1">
                  <TabsTrigger value="linkedin" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-platform-linkedin/25 data-[state=active]:to-platform-linkedin/10 data-[state=active]:text-platform-linkedin data-[state=active]:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-platform-twitter/25 data-[state=active]:to-platform-twitter/10 data-[state=active]:text-platform-twitter data-[state=active]:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </TabsTrigger>
                  <TabsTrigger value="reddit" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-platform-reddit/25 data-[state=active]:to-platform-reddit/10 data-[state=active]:text-platform-reddit data-[state=active]:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    Reddit
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-platform-instagram/25 data-[state=active]:to-platform-instagram/10 data-[state=active]:text-platform-instagram data-[state=active]:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm4.25 4a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm4.5-2.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
                    </svg>
                    Instagram
                  </TabsTrigger>
                  <TabsTrigger value="facebook" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-platform-facebook/25 data-[state=active]:to-platform-facebook/10 data-[state=active]:text-platform-facebook data-[state=active]:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                    Facebook
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Platform Tab Content */}
              {["linkedin", "twitter", "reddit", "instagram", "facebook"].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-6">
                  {/* Filters Section */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Author Filter */}
                    <Popover open={authorOpen} onOpenChange={setAuthorOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[200px] justify-between bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-xl"
                        >
                          <span className="truncate">
                            {selectedAuthors.length === 0 
                              ? "Filter by author..."
                              : `${selectedAuthors.length} author${selectedAuthors.length > 1 ? 's' : ''}`
                            }
                          </span>
                          <svg className="ml-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-2 bg-popover border-border" align="start">
                        <div className="space-y-1">
                          {availableAuthors.map((author) => (
                            <button
                              key={author}
                              onClick={() => toggleAuthor(author)}
                              className="flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <div className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                                selectedAuthors.includes(author)
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "border-input"
                              )}>
                                {selectedAuthors.includes(author) && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span className="truncate">{author}</span>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Tag Filter */}
                    <Popover open={tagOpen} onOpenChange={setTagOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[200px] justify-between bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-xl"
                        >
                          <span className="truncate">
                            {selectedTags.length === 0 
                              ? "Filter by tag..."
                              : `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''}`
                            }
                          </span>
                          <svg className="ml-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-2 bg-popover border-border" align="start">
                        <div className="space-y-1">
                          {availableTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className="flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <div className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                                selectedTags.includes(tag)
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "border-input"
                              )}>
                                {selectedTags.includes(tag) && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span className="truncate">{tag}</span>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Clear Filters */}
                    {(selectedAuthors.length > 0 || selectedTags.length > 0) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedAuthors([]);
                          setSelectedTags([]);
                        }}
                        className="h-9 px-3 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear filters
                      </Button>
                    )}

                    {/* Active Filters Display */}
                    {selectedAuthors.map((author) => (
                      <Badge 
                        key={author} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-primary/20 gap-1"
                      >
                        Author: {author}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-primary/70" 
                          onClick={() => toggleAuthor(author)}
                        />
                      </Badge>
                    ))}
                    {selectedTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-primary/20 gap-1"
                      >
                        Tag: {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-primary/70" 
                          onClick={() => toggleTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>

                  {/* Links Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {platformFilteredLinks.length > 0 ? (
                      platformFilteredLinks.map((link) => <LinkCard key={link.id} link={link} />)
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No links found</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

        {/* Mobile - Platform Tabs */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2.5">
                {activeTab === "linkedin" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-linkedin/25 to-platform-linkedin/10">
                      <svg className="w-5 h-5 text-platform-linkedin" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span>LinkedIn</span>
                  </>
                )}
                {activeTab === "twitter" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-twitter/25 to-platform-twitter/10">
                      <svg className="w-5 h-5 text-platform-twitter" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span>X (Twitter)</span>
                  </>
                )}
                {activeTab === "reddit" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-reddit/25 to-platform-reddit/10">
                      <svg className="w-5 h-5 text-platform-reddit" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                      </svg>
                    </div>
                    <span>Reddit</span>
                  </>
                )}
                {activeTab === "instagram" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-instagram/25 to-platform-instagram/10">
                      <svg className="w-5 h-5 text-platform-instagram" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm4.25 4a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm4.5-2.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
                      </svg>
                    </div>
                    <span>Instagram</span>
                  </>
                )}
                {activeTab === "facebook" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-facebook/25 to-platform-facebook/10">
                      <svg className="w-5 h-5 text-platform-facebook" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    </div>
                    <span>Facebook</span>
                  </>
                )}
              </h2>
            </div>

            {/* Mobile Filters */}
            <div className="flex flex-col gap-3 mb-4">
              {/* Author Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-xl"
                  >
                    <span className="truncate">
                      {selectedAuthors.length === 0 
                        ? "Filter by author..."
                        : `${selectedAuthors.length} author${selectedAuthors.length > 1 ? 's' : ''}`
                      }
                    </span>
                    <svg className="ml-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-2rem)] p-2 bg-popover border-border">
                  <div className="space-y-1 max-h-[300px] overflow-y-auto">
                    {availableAuthors.map((author) => (
                      <button
                        key={author}
                        onClick={() => toggleAuthor(author)}
                        className="flex items-center w-full px-2 py-2 text-sm rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                          selectedAuthors.includes(author)
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-input"
                        )}>
                          {selectedAuthors.includes(author) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span className="truncate">{author}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Tag Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-xl"
                  >
                    <span className="truncate">
                      {selectedTags.length === 0 
                        ? "Filter by tag..."
                        : `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''}`
                      }
                    </span>
                    <svg className="ml-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-2rem)] p-2 bg-popover border-border">
                  <div className="space-y-1 max-h-[300px] overflow-y-auto">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className="flex items-center w-full px-2 py-2 text-sm rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                          selectedTags.includes(tag)
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-input"
                        )}>
                          {selectedTags.includes(tag) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span className="truncate">{tag}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Active Filters */}
              {(selectedAuthors.length > 0 || selectedTags.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {selectedAuthors.map((author) => (
                    <Badge 
                      key={author} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary border-primary/20 gap-1"
                    >
                      {author}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-primary/70" 
                        onClick={() => toggleAuthor(author)}
                      />
                    </Badge>
                  ))}
                  {selectedTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary border-primary/20 gap-1"
                    >
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-primary/70" 
                        onClick={() => toggleTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Clear Filters Button */}
              {(selectedAuthors.length > 0 || selectedTags.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedAuthors([]);
                    setSelectedTags([]);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Links Grid - Mobile */}
            <div className="grid grid-cols-1 gap-4">
              {platformFilteredLinks.length > 0 ? (
                platformFilteredLinks.map((link) => <LinkCard key={link.id} link={link} />)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No links found</p>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

const LinkCard = ({ link }: { link: LinkItem }) => {
  return (
    <article className="group relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-blur hover:shadow-glow hover:border-primary/30 transition-all duration-300 overflow-hidden">
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <Badge 
            variant="secondary" 
            className={`text-xs ${
              link.platform === "linkedin" 
                ? "bg-accent-blue/10 text-accent-blue border-accent-blue/20" 
                : "bg-primary/10 text-primary border-primary/20"
            }`}
          >
            {link.platform === "linkedin" ? "LinkedIn" : "X"}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
            onClick={() => window.open(link.url, "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        <h3 className="font-semibold text-base mb-2 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {link.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {link.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="font-medium">{link.author}</span>
          <span>•</span>
          <span>{link.savedAt}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {link.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs bg-muted/30 border-border/50"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Dashboard;
