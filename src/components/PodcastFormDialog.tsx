import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CATEGORIES, type Podcast } from "@/types/podcast";

interface PodcastFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; description: string; host: string; category: string; thumbnail: string }) => void;
  editData?: Podcast | null;
}

export function PodcastFormDialog({ open, onOpenChange, onSubmit, editData }: PodcastFormDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
      setHost(editData.host);
      setCategory(editData.category);
      setThumbnail(editData.thumbnail);
    } else {
      setTitle(""); setDescription(""); setHost(""); setCategory(CATEGORIES[0]); setThumbnail("");
    }
  }, [editData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !host.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), host: host.trim(), category, thumbnail: thumbnail.trim() });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-xl">{editData ? "Edit" : "Add"} Podcast</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary border-border" required />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-secondary border-border" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Host *</Label>
              <Input value={host} onChange={(e) => setHost(e.target.value)} className="bg-secondary border-border" required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Thumbnail URL</Label>
            <Input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="bg-secondary border-border" placeholder="https://..." />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            {editData ? "Update" : "Add"} Podcast
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
