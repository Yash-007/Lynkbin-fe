import { useState } from "react";
import { Sparkles, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/store/hooks";
import { addLink } from "@/store/slices/linksSlice";
import { toast } from "sonner";

interface AddLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddLinkModal = ({ open, onOpenChange }: AddLinkModalProps) => {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
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
      const escapedUrl = encodeURIComponent(url);
      await dispatch(addLink({ url: escapedUrl, tags: tags.length > 0 ? tags : undefined })).unwrap();
      toast.success("Link saved successfully! 🎉");
      
      // Reset form and close modal
      setUrl("");
      setTags([]);
      setTagInput("");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error || "Failed to save link. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setUrl("");
      setTags([]);
      setTagInput("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50 p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            Save a Link
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Paste any link from LinkedIn or X
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mt-3 sm:mt-4">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="modal-url" className="text-foreground text-sm">
              Link URL
            </Label>
            <Input
              id="modal-url"
              type="url"
              placeholder="https://linkedin.com/pulse/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="bg-background/50 border-border/50 focus-visible:ring-primary text-sm sm:text-base h-10 sm:h-11"
              autoFocus
            />
          </div>

          {/* Tags Input */}
          <div className="space-y-2">
            <Label htmlFor="modal-tags" className="text-foreground text-sm">
              Tags <span className="text-muted-foreground text-xs">(Optional, max 3)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="modal-tags"
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                disabled={tags.length >= 3}
                className="bg-background/50 border-border/50 focus-visible:ring-primary text-sm sm:text-base h-10 sm:h-11"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={tags.length >= 3 || !tagInput.trim()}
                className="bg-card/50 border-border/50 hover:bg-card/80 shrink-0 h-10 sm:h-11 px-3 sm:px-4"
              >
                Add
              </Button>
            </div>
            
            {/* Display added tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-1 sm:px-2.5 sm:py-1.5"
                  >
                    <span className="max-w-[120px] sm:max-w-none truncate">{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1.5 hover:text-primary-dark flex-shrink-0"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-card/50 border-border/50 hover:bg-card/80 h-10 sm:h-11 text-sm sm:text-base"
              onClick={handleClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 shadow-blur h-10 sm:h-11 text-sm sm:text-base"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  <span className="hidden sm:inline">Processing...</span>
                  <span className="sm:hidden">Saving...</span>
                </>
              ) : (
                "Save Link"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

