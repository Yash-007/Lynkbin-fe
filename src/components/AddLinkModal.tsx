import { useState } from "react";
import { Sparkles, X as XIcon, Link2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState<"link" | "notes">("link");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
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
    
    const isUrl = activeTab === "link";
    
    if (isUrl && !url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    if (!isUrl && !notes.trim()) {
      toast.error("Please enter some notes");
      return;
    }

    // Close modal immediately
    onOpenChange(false);
    
    // Reset form immediately
    const urlToSubmit = url;
    const notesToSubmit = notes;
    const tagsToSubmit = tags.length > 0 ? [...tags] : undefined;
    setUrl("");
    setNotes("");
    setTags([]);
    setTagInput("");
    setActiveTab("link");

    // Show loading toast with nice indicator and close icon
    const loadingMessage = isUrl 
      ? "Your link will be saved in a few seconds..." 
      : "Your notes will be saved in a few seconds...";
    
    toast.loading(loadingMessage, {
      id: 'saving-link',
      dismissible: true, // Shows X icon to close
    });

    // Process in background
    try {
      if (isUrl) {
        const escapedUrl = encodeURIComponent(urlToSubmit);
        await dispatch(addLink({ 
          url: escapedUrl, 
          notes: "", 
          is_url: true, 
          tags: tagsToSubmit 
        })).unwrap();
      } else {
        await dispatch(addLink({ 
          url: "", 
          notes: notesToSubmit, 
          is_url: false, 
          tags: tagsToSubmit 
        })).unwrap();
      }
      
      // Dismiss loading toast and show success
      toast.dismiss('saving-link');
      const successMessage = isUrl ? "Link saved successfully!" : "Notes saved successfully!";
      toast.success(successMessage);
    } catch (error: any) {
      // Dismiss loading toast and show error
      toast.dismiss('saving-link');
      const errorMessage = isUrl 
        ? "Failed to save link. Please try again." 
        : "Failed to save notes. Please try again.";
      toast.error(error || errorMessage);
    }
  };

  const handleClose = () => {
    setUrl("");
    setNotes("");
    setTags([]);
    setTagInput("");
    setActiveTab("link");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50 p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            Save Content
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Save a link from LinkedIn/X or add your own notes
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mt-3 sm:mt-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "link" | "notes")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="link" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Link2 className="w-4 h-4" />
                <span className="hidden sm:inline">Link</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2 data-[state=active]:bg-background">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="space-y-4 mt-4">
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
                  className="bg-background/50 border-border/50 focus-visible:ring-primary text-sm sm:text-base h-10 sm:h-11"
                />
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 mt-4">
              {/* Notes Input */}
              <div className="space-y-2">
                <Label htmlFor="modal-notes" className="text-foreground text-sm">
                  Your Notes
                </Label>
                <Textarea
                  id="modal-notes"
                  placeholder="Write your thoughts, ideas, or any content you want to save..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-background/50 border-border/50 focus-visible:ring-primary text-sm sm:text-base min-h-[120px] resize-none"
                  rows={6}
                />
              </div>
            </TabsContent>
          </Tabs>

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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 shadow-blur h-10 sm:h-11 text-sm sm:text-base"
            >
              {activeTab === "link" ? "Save Link" : "Save Notes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

