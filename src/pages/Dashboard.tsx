import { useState, useEffect } from "react";
import { Search, Plus, Link as LinkIcon, ExternalLink, Tag, X, Grid3x3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [searchQuery, setSearchQuery] = useState("");
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

  // For platform view - filter by search, platform, author, and tag
  const platformFilteredLinks = mockLinks.filter((link) => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = link.platform === activeTab;
    const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(link.author);
    const matchesTag = selectedTags.length === 0 || link.tags.some(tag => selectedTags.includes(tag));
    return matchesSearch && matchesPlatform && matchesAuthor && matchesTag;
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
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <LinkIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">
                LinkyBin
              </h1>
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search your saved links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card/50 border-border/50 backdrop-blur-xl shadow-blur focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Desktop - Platform Tabs */}
        <div className="hidden md:block">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
              {/* Platform Tabs */}
              <div className="overflow-x-auto scrollbar-hide">
                <TabsList className="bg-card/50 border border-border/50 backdrop-blur-xl p-1 shadow-blur inline-flex">
                  <TabsTrigger value="linkedin" className="data-[state=active]:bg-accent-blue/20 data-[state=active]:text-accent-blue">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </TabsTrigger>
                  <TabsTrigger value="reddit" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    Reddit
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-500">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </TabsTrigger>
                  <TabsTrigger value="facebook" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                {activeTab === "linkedin" && (
                  <>
                    <svg className="w-5 h-5 text-accent-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </>
                )}
                {activeTab === "twitter" && (
                  <>
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </>
                )}
                {activeTab === "reddit" && (
                  <>
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    Reddit
                  </>
                )}
                {activeTab === "instagram" && (
                  <>
                    <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </>
                )}
                {activeTab === "facebook" && (
                  <>
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
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
