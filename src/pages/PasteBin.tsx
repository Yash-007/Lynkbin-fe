import { useState } from "react";
import { Sparkles, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { addLink } from "@/store/slices/linksSlice";
import { toast } from "sonner";

const PasteBin = () => {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && tags.length < 3 && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    } else if (tags.length >= 3) {
      toast.error("Maximum 3 tags allowed");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsProcessing(true);

    try {
      // TODO: Update API to accept tags when backend supports it
      await dispatch(addLink(url)).unwrap();
      toast.success("Link saved successfully! 🎉");
      setUrl("");
      setTags([]);
      setTagInput("");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error || "Failed to save link. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-glow pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="hover:bg-card/50"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
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
                  <p className="text-[10px] text-muted-foreground -mt-0.5">Add New Link</p>
                </div>
              </div>
            </div>
            {/* Desktop - Profile Button */}
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl relative z-10">
        <div className="bg-card/30 backdrop-blur-xl rounded-2xl border border-border/50 shadow-blur p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Save a Link
            </h2>
            <p className="text-muted-foreground text-sm">
              Paste any link from LinkedIn or X
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-foreground text-sm">Link URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://linkedin.com/pulse/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="bg-background/50 border-border/50 focus-visible:ring-primary"
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-foreground text-sm">
                Tags <span className="text-muted-foreground text-xs">(Optional, max 3)</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  type="text"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  disabled={tags.length >= 3}
                  className="bg-background/50 border-border/50 focus-visible:ring-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={tags.length >= 3 || !tagInput.trim()}
                  className="bg-card/50 border-border/50 hover:bg-card/80"
                >
                  Add
                </Button>
              </div>
              
              {/* Display added tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 hover:text-primary-dark"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-card/50 border-border/50 hover:bg-card/80"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 shadow-blur"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Save Link"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasteBin;
