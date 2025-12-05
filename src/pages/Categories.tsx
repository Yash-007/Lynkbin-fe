import { useState, useEffect } from "react";
import { Filter, ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>,
  twitter: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>,
  reddit: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>,
  instagram: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm4.25 4a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm4.5-2.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
  </svg>,
  facebook: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>,
};

const platformColors: Record<Platform, { bg: string; text: string; border: string }> = {
  linkedin: { bg: "bg-platform-linkedin/15", text: "text-platform-linkedin", border: "border-platform-linkedin/30" },
  twitter: { bg: "bg-platform-twitter/15", text: "text-platform-twitter", border: "border-platform-twitter/30" },
  reddit: { bg: "bg-platform-reddit/15", text: "text-platform-reddit", border: "border-platform-reddit/30" },
  instagram: { bg: "bg-platform-instagram/15", text: "text-platform-instagram", border: "border-platform-instagram/30" },
  facebook: { bg: "bg-platform-facebook/15", text: "text-platform-facebook", border: "border-platform-facebook/30" },
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

  // Filter by platform and category
  const filteredLinks = mockLinks.filter((link) => {
    const matchesPlatform = link.platform === selectedPlatform;
    const matchesCategory = link.category === selectedCategory;
    return matchesPlatform && matchesCategory;
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
              <Badge 
                variant="secondary" 
                className={`${platformColors[selectedPlatform].bg} ${platformColors[selectedPlatform].text} ${platformColors[selectedPlatform].border} border flex items-center gap-1.5`}
              >
                {platformIcons[selectedPlatform]}
                {platformLabels[selectedPlatform]}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
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
                    ? `${platformColors[platform].bg} ${platformColors[platform].text} ${platformColors[platform].border} border hover:bg-opacity-80 whitespace-nowrap flex items-center gap-2 transition-all duration-300`
                    : "bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/80 whitespace-nowrap flex items-center gap-2 transition-all duration-300"
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
