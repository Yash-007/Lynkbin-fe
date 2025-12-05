import { useState, useEffect } from "react";
import { Search, Filter, ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MobileBottomNav } from "@/components/MobileBottomNav";

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

const categories = ["Design", "Engineering", "Development", "Technology", "Business"];

const platforms = ["linkedin", "twitter", "reddit", "instagram", "facebook"] as const;
type Platform = typeof platforms[number];

const platformLabels: Record<Platform, string> = {
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
  reddit: "Reddit",
  instagram: "Instagram",
  facebook: "Facebook",
};

const platformIcons: Record<Platform, JSX.Element> = {
  linkedin: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>,
  twitter: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>,
  reddit: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>,
  instagram: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>,
  facebook: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>,
};

const LinkCard = ({ link }: { link: LinkItem }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-xl hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {link.title}
      </h3>
      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
      {link.description}
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{link.author}</span>
        <span className="text-muted-foreground/50">•</span>
        <span className="text-xs text-muted-foreground">{link.savedAt}</span>
      </div>
      <div className="flex items-center gap-1">
        {link.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-muted/50 text-[10px] px-1.5 py-0">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  </a>
);

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Design");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("linkedin");
  const navigate = useNavigate();

  // Get platform from localStorage (set by Dashboard)
  useEffect(() => {
    const savedPlatform = localStorage.getItem("selectedPlatform") as Platform;
    if (savedPlatform && platforms.includes(savedPlatform)) {
      setSelectedPlatform(savedPlatform);
    }
  }, []);

  // Filter by search, platform, and category
  const filteredLinks = mockLinks.filter((link) => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = link.platform === selectedPlatform;
    const matchesCategory = link.category === selectedCategory;
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
              <h1 className="text-xl font-bold text-foreground">Categories</h1>
              <p className="text-xs text-muted-foreground">Browse by category</p>
            </div>
            {/* Mobile - Show current platform */}
            <div className="md:hidden">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5">
                {platformIcons[selectedPlatform]}
                {platformLabels[selectedPlatform]}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-border/50 backdrop-blur-xl"
          />
        </div>


        {/* Platform Selector - Desktop Only */}
        <div className="mb-6 hidden md:block">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-muted-foreground">Platform:</span>
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max">
              {platforms.map((platform) => (
                <Button
                  key={platform}
                  variant={selectedPlatform === platform ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform(platform)}
                  className={selectedPlatform === platform
                    ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 whitespace-nowrap flex items-center gap-2"
                    : "bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/80 whitespace-nowrap flex items-center gap-2"
                  }
                >
                  {platformIcons[platform]}
                  {platformLabels[platform]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Category:</span>
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat
                    ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 whitespace-nowrap"
                    : "bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/80 whitespace-nowrap"
                  }
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium text-foreground">
              {selectedCategory}
            </h2>
            <Badge variant="secondary" className="bg-muted/30 text-sm flex items-center gap-1.5">
              <span className="hidden md:inline-flex">{platformIcons[selectedPlatform]}</span>
              {filteredLinks.length} from {platformLabels[selectedPlatform]}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Tag className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  No {platformLabels[selectedPlatform]} links found in {selectedCategory}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav activeTab={selectedPlatform} onTabChange={(platform) => setSelectedPlatform(platform as Platform)} />
    </div>
  );
};

export default Categories;
