import { useState, useEffect } from "react";
import { Plus, Link as LinkIcon, ExternalLink, Tag, X, Grid3x3, Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AddLinkModal } from "@/components/AddLinkModal";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchLinksByPlatform, 
  fetchAuthors, 
  fetchTags,
  setSelectedPlatform,
  setSelectedAuthors,
  setSelectedTags,
  setSortOrder,
  toggleAuthor, 
  toggleTag, 
  clearFilters,
  LinkItem 
} from "@/store/slices/linksSlice";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Redux state
  const { 
    items: links, 
    selectedPlatform, 
    selectedAuthors, 
    selectedTags,
    sortOrder,
    availableAuthors, 
    availableTags,
    isLoading, 
    error 
  } = useAppSelector((state) => state.links);

  // Local UI state
  const [authorOpen, setAuthorOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersSheetOpen, setFiltersSheetOpen] = useState(false);
  const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);
  const [showTelegramBanner, setShowTelegramBanner] = useState(() => {
    return localStorage.getItem("hideTelegramBanner") !== "true";
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const dismissTelegramBanner = () => {
    setShowTelegramBanner(false);
    localStorage.setItem("hideTelegramBanner", "true");
  };

  // Initialize filters from URL params on mount
  useEffect(() => {
    const platformParam = searchParams.get('platform');
    const authorsParam = searchParams.get('authors');
    const tagsParam = searchParams.get('tags');
    const sortParam = searchParams.get('sort') as 'desc' | 'asc' | null;

    if (platformParam) {
      dispatch(setSelectedPlatform(platformParam));
    }

    if (authorsParam) {
      const authors = authorsParam.split(',').filter(a => a.trim());
      dispatch(setSelectedAuthors(authors));
    }

    if (tagsParam) {
      const tags = tagsParam.split(',').filter(t => t.trim());
      dispatch(setSelectedTags(tags));
    }

    if (sortParam && (sortParam === 'desc' || sortParam === 'asc')) {
      dispatch(setSortOrder(sortParam));
    }

    setIsInitialized(true);
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();
    
    // Add platform to URL
    params.set('platform', selectedPlatform);
    
    // Add authors to URL
    if (selectedAuthors.length > 0) {
      params.set('authors', selectedAuthors.join(','));
    }
    
    // Add tags to URL
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }

    // Add sort order to URL
    if (sortOrder !== 'desc') {
      params.set('sort', sortOrder);
    }

    setSearchParams(params, { replace: true });
  }, [selectedPlatform, selectedAuthors, selectedTags, sortOrder, isInitialized, setSearchParams]);

  // Fetch data when component mounts or platform/filters change
  useEffect(() => {
    if (!isInitialized) return;
    
    dispatch(fetchLinksByPlatform(selectedPlatform));
    dispatch(fetchAuthors(selectedPlatform));
    dispatch(fetchTags(selectedPlatform));
  }, [dispatch, selectedPlatform, selectedAuthors, selectedTags, isInitialized]);

  // Show error toast if API call fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleTabChange = (tab: string) => {
    dispatch(setSelectedPlatform(tab));
    dispatch(clearFilters());
  };

  const handleToggleAuthor = (author: string) => {
    dispatch(toggleAuthor(author));
  };

  const handleToggleTag = (tag: string) => {
    dispatch(toggleTag(tag));
  };

  // Filtered and sorted links
  const platformFilteredLinks = [...links].sort((a, b) => {
    const dateA = new Date(a.savedAt).getTime();
    const dateB = new Date(b.savedAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });


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
                onClick={() => setAddLinkModalOpen(true)} 
                className="bg-primary hover:bg-primary/90 shadow-blur"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
              <Button 
                onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
                variant="outline"
                className="bg-[#0088cc]/10 border-[#0088cc]/30 hover:bg-[#0088cc]/20 text-[#0088cc] backdrop-blur-xl"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                Telegram Bot
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

      {/* Telegram Bot Info Banner */}
      {showTelegramBanner && (
        <div className="relative z-10 border-b border-border/50 bg-gradient-to-r from-[#0088cc]/5 via-primary/5 to-[#0088cc]/5">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')} className="cursor-pointer flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#0088cc] to-[#229ED9] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    💡 Quick Tip: Save links instantly via Telegram
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Forward any link to @lynkbin_bot and it'll be saved to your vault
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
                  className="bg-[#0088cc]/10 border-[#0088cc]/30 hover:bg-[#0088cc]/20 text-[#0088cc] hidden md:flex"
                >
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                  Try Bot
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={dismissTelegramBanner}
                  className="hover:bg-muted/50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Desktop - Platform Tabs */}
        <div className="hidden md:block">
          <Tabs value={selectedPlatform} onValueChange={handleTabChange} className="space-y-6">
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
                        <div className="space-y-1 max-h-[300px] overflow-y-auto">
                          {availableAuthors.map((author) => (
                            <button
                              key={author}
                              onClick={() => handleToggleAuthor(author)}
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
                        <div className="space-y-1 max-h-[300px] overflow-y-auto">
                          {availableTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleToggleTag(tag)}
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

                    {/* Sort Order Filter */}
                    <Popover open={sortOpen} onOpenChange={setSortOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[160px] justify-between bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-xl"
                        >
                          <span className="truncate flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                          </span>
                          <svg className="ml-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[160px] p-2 bg-popover border-border" align="start">
                        <div className="space-y-1">
                          <button
                            onClick={() => {
                              dispatch(setSortOrder('desc'));
                              setSortOpen(false);
                            }}
                            className="flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <div className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                              sortOrder === 'desc'
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-input"
                            )}>
                              {sortOrder === 'desc' && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>Newest First</span>
                          </button>
                          <button
                            onClick={() => {
                              dispatch(setSortOrder('asc'));
                              setSortOpen(false);
                            }}
                            className="flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <div className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                              sortOrder === 'asc'
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-input"
                            )}>
                              {sortOrder === 'asc' && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>Oldest First</span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Clear Filters */}
                    {(selectedAuthors.length > 0 || selectedTags.length > 0) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch(clearFilters())}
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
                    {isLoading ? (
                      <div className="col-span-full text-center py-12">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading links...</p>
                      </div>
                    ) : platformFilteredLinks.length > 0 ? (
                      platformFilteredLinks.map((link) => <LinkCard key={link.id} link={link} />)
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No links found. Start by adding your first link!</p>
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
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2.5 flex-1">
                {selectedPlatform === "linkedin" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-linkedin/25 to-platform-linkedin/10">
                      <svg className="w-5 h-5 text-platform-linkedin" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span>LinkedIn</span>
                  </>
                )}
                {selectedPlatform === "twitter" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-twitter/25 to-platform-twitter/10">
                      <svg className="w-5 h-5 text-platform-twitter" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span>X (Twitter)</span>
                  </>
                )}
                {selectedPlatform === "reddit" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-reddit/25 to-platform-reddit/10">
                      <svg className="w-5 h-5 text-platform-reddit" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                      </svg>
                    </div>
                    <span>Reddit</span>
                  </>
                )}
                {selectedPlatform === "instagram" && (
                  <>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-platform-instagram/25 to-platform-instagram/10">
                      <svg className="w-5 h-5 text-platform-instagram" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm4.25 4a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm4.5-2.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
                      </svg>
                    </div>
                    <span>Instagram</span>
                  </>
                )}
                {selectedPlatform === "facebook" && (
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
              <Button
                size="sm"
                onClick={() => window.open('https://t.me/lynkbin_bot', '_blank')}
                className="bg-[#0088cc]/10 border border-[#0088cc]/30 hover:bg-[#0088cc]/20 text-[#0088cc] h-9 px-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </Button>
            </div>

            {/* Mobile Filters - Compact Design */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                {/* Filters Sheet Trigger */}
                <Sheet open={filtersSheetOpen} onOpenChange={setFiltersSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 justify-between bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-xl"
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filters & Sort</span>
                        {(selectedAuthors.length > 0 || selectedTags.length > 0) && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary h-5 px-1.5 text-xs">
                            {selectedAuthors.length + selectedTags.length}
                          </Badge>
                        )}
                      </span>
                      <svg className="h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="bottom" className="h-[85vh] bg-background/95 backdrop-blur-xl border-t border-border">
                    <SheetHeader className="text-left mb-6">
                      <SheetTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Filter className="h-5 w-5 text-primary" />
                          Filters & Sort
                        </span>
                        {(selectedAuthors.length > 0 || selectedTags.length > 0) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch(clearFilters())}
                            className="text-muted-foreground hover:text-foreground h-8"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Clear all
                          </Button>
                        )}
                      </SheetTitle>
                    </SheetHeader>

                    <div className="space-y-6 overflow-y-auto h-[calc(85vh-80px)] pb-6">
                      {/* Sort Order Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                          </svg>
                          Sort Order
                        </h3>
                        <div className="space-y-2">
                          <button
                            onClick={() => dispatch(setSortOrder('desc'))}
                            className={cn(
                              "flex items-center w-full px-4 py-3 text-sm rounded-lg border transition-all",
                              sortOrder === 'desc'
                                ? "bg-primary/10 border-primary/30 text-primary font-medium"
                                : "bg-card/50 border-border/50 hover:bg-card/80"
                            )}
                          >
                            <div className={cn(
                              "mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2",
                              sortOrder === 'desc'
                                ? "bg-primary border-primary"
                                : "border-input"
                            )}>
                              {sortOrder === 'desc' && (
                                <div className="h-2 w-2 rounded-full bg-white" />
                              )}
                            </div>
                            <span>Newest First</span>
                          </button>
                          <button
                            onClick={() => dispatch(setSortOrder('asc'))}
                            className={cn(
                              "flex items-center w-full px-4 py-3 text-sm rounded-lg border transition-all",
                              sortOrder === 'asc'
                                ? "bg-primary/10 border-primary/30 text-primary font-medium"
                                : "bg-card/50 border-border/50 hover:bg-card/80"
                            )}
                          >
                            <div className={cn(
                              "mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2",
                              sortOrder === 'asc'
                                ? "bg-primary border-primary"
                                : "border-input"
                            )}>
                              {sortOrder === 'asc' && (
                                <div className="h-2 w-2 rounded-full bg-white" />
                              )}
                            </div>
                            <span>Oldest First</span>
                          </button>
                        </div>
                      </div>

                      {/* Authors Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Authors
                          {selectedAuthors.length > 0 && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary h-5 px-1.5 text-xs">
                              {selectedAuthors.length}
                            </Badge>
                          )}
                        </h3>
                        <div className="space-y-1 max-h-[250px] overflow-y-auto rounded-lg border border-border/50 bg-card/30 p-2">
                          {availableAuthors.length > 0 ? (
                            availableAuthors.map((author) => (
                              <button
                                key={author}
                                onClick={() => handleToggleAuthor(author)}
                                className="flex items-center w-full px-3 py-2.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                <div className={cn(
                                  "mr-3 flex h-4 w-4 items-center justify-center rounded border",
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
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No authors available</p>
                          )}
                        </div>
                      </div>

                      {/* Tags Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Tag className="w-4 h-4 text-primary" />
                          Tags
                          {selectedTags.length > 0 && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary h-5 px-1.5 text-xs">
                              {selectedTags.length}
                            </Badge>
                          )}
                        </h3>
                        <div className="space-y-1 max-h-[250px] overflow-y-auto rounded-lg border border-border/50 bg-card/30 p-2">
                          {availableTags.length > 0 ? (
                            availableTags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleToggleTag(tag)}
                                className="flex items-center w-full px-3 py-2.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                <div className={cn(
                                  "mr-3 flex h-4 w-4 items-center justify-center rounded border",
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
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No tags available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters Chips */}
              {(selectedAuthors.length > 0 || selectedTags.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {selectedAuthors.map((author) => (
                    <Badge 
                      key={author} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary border-primary/20 gap-1.5 pr-1"
                    >
                      <span className="truncate max-w-[120px]">{author}</span>
                      <button
                        onClick={() => handleToggleAuthor(author)}
                        className="hover:bg-primary/20 rounded-sm p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary border-primary/20 gap-1.5 pr-1"
                    >
                      <Tag className="h-3 w-3" />
                      <span className="truncate max-w-[120px]">{tag}</span>
                      <button
                        onClick={() => handleToggleTag(tag)}
                        className="hover:bg-primary/20 rounded-sm p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Links Grid - Mobile */}
            <div className="grid grid-cols-1 gap-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading links...</p>
                </div>
              ) : platformFilteredLinks.length > 0 ? (
                platformFilteredLinks.map((link) => <LinkCard key={link.id} link={link} />)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No links found. Start by adding your first link!</p>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        activeTab={selectedPlatform} 
        onTabChange={handleTabChange}
        onAddLinkClick={() => setAddLinkModalOpen(true)}
      />

      {/* Add Link Modal */}
      <AddLinkModal open={addLinkModalOpen} onOpenChange={setAddLinkModalOpen} />
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // If within last 24 hours, show relative time
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        if (diffInMinutes < 1) return 'Just now';
        return `${diffInMinutes}m ago`;
      }
      return `${diffInHours}h ago`;
    }
    
    // If within last week, show days ago
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }

    // Otherwise show formatted date
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  } catch (error) {
    return dateString;
  }
};

const LinkCard = ({ link }: { link: LinkItem }) => {
  const handleCardClick = () => {
    if (link.link) {
      window.open(link.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article 
      onClick={handleCardClick}
      className="group block p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-xl hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
    >
      {/* Platform badge */}
      <div className="flex items-start justify-between mb-3">
        <Badge 
          variant="secondary" 
          className={`text-[10px] px-1.5 py-0 ${
            link.platform === "linkedin" 
              ? "bg-accent-blue/10 text-accent-blue border-accent-blue/20" 
              : "bg-primary/10 text-primary border-primary/20"
          }`}
        >
          {link.platform === "linkedin" ? "LinkedIn" : "X"}
        </Badge>
        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Author and Date */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {link.author}
        </span>
        <span className="text-xs text-muted-foreground/50">•</span>
        <span className="text-xs text-muted-foreground">{formatDate(link.savedAt)}</span>
      </div>

      {/* Title */}
      <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
        {link.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {link.description}
      </p>

      {/* Tags at the bottom */}
      <div className="flex items-center gap-1 flex-wrap">
        {link.tags.slice(0, 3).map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="bg-muted/50 text-[10px] md:text-xs px-1.5 py-0.5"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
};

export default Dashboard;
