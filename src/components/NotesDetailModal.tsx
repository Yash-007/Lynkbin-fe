import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LinkItem } from "@/store/slices/linksSlice";
import { toast } from "sonner";

interface NotesDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: LinkItem | null;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
};

export const NotesDetailModal = ({ open, onOpenChange, note }: NotesDetailModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!note) return null;

  const handleCopy = async () => {
    try {
      // Copy only the note data (content)
      await navigator.clipboard.writeText(note.data);
      setCopied(true);
      toast.success("Note copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy note");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[700px] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50 p-0 gap-0 [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 space-y-0 border-b border-border/50 text-left">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="flex-1 min-w-0 pr-1">
              <DialogTitle className="text-left text-base sm:text-xl font-semibold text-foreground leading-snug mb-1.5 sm:mb-2 break-words">
                {note.title}
              </DialogTitle>
              {/* Compact meta info */}
              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs text-muted-foreground">
                {note.author && <span className="font-medium truncate max-w-[150px]">{note.author}</span>}
                {note.author && <span className="text-muted-foreground/50">•</span>}
                <span className="whitespace-nowrap">{formatDate(note.savedAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 -mt-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-blue-500/10 hover:text-blue-500 transition-colors"
                title="Copy note"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-muted"
                title="Close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Note Content */}
          <div className="mb-4">
            <p className="text-sm sm:text-base text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {note.data}
            </p>
          </div>

          {/* Compact Tags and Category */}
          {((note.tags && note.tags.length > 0) || note.category) && (
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/30">
              {note.category && (
                <Badge 
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-background/50 border-border/50"
                >
                  {note.category}
                </Badge>
              )}
              {note.tags && note.tags.length > 0 && note.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

