import { useState } from "react";
import { Edit, Trash2, Plus, ChevronDown, ChevronUp, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "./AudioPlayer";
import { EpisodeFormDialog } from "./EpisodeFormDialog";
import type { Podcast, Episode } from "@/types/podcast";

interface PodcastCardProps {
  podcast: Podcast;
  onEdit: (podcast: Podcast) => void;
  onDelete: (id: string) => void;
  onAddEpisode: (podcastId: string, data: Omit<Episode, "id" | "podcastId">) => void;
  onDeleteEpisode: (podcastId: string, episodeId: string) => void;
}

export function PodcastCard({ podcast, onEdit, onDelete, onAddEpisode, onDeleteEpisode }: PodcastCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [episodeDialogOpen, setEpisodeDialogOpen] = useState(false);

  return (
    <>
      <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:glow-primary group">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden">
          {podcast.thumbnail ? (
            <img
              src={podcast.thumbnail}
              alt={podcast.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full gradient-primary opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-primary/80 text-primary-foreground border-0 text-xs">
            {podcast.category}
          </Badge>
          <div className="absolute top-3 right-3 flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 bg-card/60 hover:bg-card/80 text-foreground" onClick={() => onEdit(podcast)}>
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 bg-card/60 hover:bg-destructive/80 text-foreground hover:text-destructive-foreground" onClick={() => onDelete(podcast.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground text-lg leading-tight">{podcast.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">by {podcast.host}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{podcast.description}</p>

          {/* Episodes toggle */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {podcast.episodes.length} episode{podcast.episodes.length !== 1 ? "s" : ""}
            </button>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:text-primary/80" onClick={() => setEpisodeDialogOpen(true)}>
              <Plus className="h-3.5 w-3.5 mr-1" /> Add
            </Button>
          </div>

          {/* Episodes list */}
          {expanded && podcast.episodes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border animate-in slide-in-from-top-2 duration-200">
              {podcast.episodes.map((ep) => (
                <div key={ep.id} className="flex items-center justify-between bg-secondary/50 rounded-lg p-2.5 group/ep">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{ep.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      {ep.duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ep.duration}</span>}
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{ep.publishDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <AudioPlayer url={ep.audioUrl} title={ep.title} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover/ep:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                      onClick={() => onDeleteEpisode(podcast.id, ep.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EpisodeFormDialog
        open={episodeDialogOpen}
        onOpenChange={setEpisodeDialogOpen}
        onSubmit={(data) => onAddEpisode(podcast.id, data)}
        podcastTitle={podcast.title}
      />
    </>
  );
}
