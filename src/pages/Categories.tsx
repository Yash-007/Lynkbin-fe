import { useState } from "react";
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
            <div>
              <h1 className="text-xl font-bold text-foreground">Categories</h1>
              <p className="text-xs text-muted-foreground">Browse by category</p>
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

        {/* Platform Selector */}
        <div className="mb-6">
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
                    ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 whitespace-nowrap"
                    : "bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/80 whitespace-nowrap"
                  }
                >
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
            <Badge variant="secondary" className="bg-muted/30 text-sm">
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
      <MobileBottomNav activeTab="categories" onTabChange={() => {}} />
    </div>
  );
};

export default Categories;
