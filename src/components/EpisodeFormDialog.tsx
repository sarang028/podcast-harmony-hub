import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EpisodeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; duration: string; audioUrl: string; publishDate: string }) => void;
  podcastTitle: string;
}

export function EpisodeFormDialog({ open, onOpenChange, onSubmit, podcastTitle }: EpisodeFormDialogProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), duration: duration.trim(), audioUrl: audioUrl.trim(), publishDate });
    setTitle(""); setDuration(""); setAudioUrl(""); setPublishDate(new Date().toISOString().split("T")[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-xl">Add Episode to {podcastTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary border-border" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-secondary border-border" placeholder="45:00" />
            </div>
            <div className="space-y-2">
              <Label>Publish Date</Label>
              <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="bg-secondary border-border" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Audio URL</Label>
            <Input value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} className="bg-secondary border-border" placeholder="https://..." />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Add Episode
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
