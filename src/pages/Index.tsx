import { useState, useMemo } from "react";
import { Plus, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePodcasts } from "@/hooks/usePodcasts";
import { StatsBar } from "@/components/StatsBar";
import { SearchFilter } from "@/components/SearchFilter";
import { PodcastCard } from "@/components/PodcastCard";
import { PodcastFormDialog } from "@/components/PodcastFormDialog";
import type { Podcast } from "@/types/podcast";

const Index = () => {
  const {
    podcasts,
    allPodcasts,
    totalEpisodes,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    addPodcast,
    updatePodcast,
    deletePodcast,
    addEpisode,
    deleteEpisode,
  } = usePodcasts();

  const [formOpen, setFormOpen] = useState(false);
  const [editPodcast, setEditPodcast] = useState<Podcast | null>(null);

  const uniqueCategories = useMemo(
    () => new Set(allPodcasts.map((p) => p.category)).size,
    [allPodcasts]
  );

  const handleSubmit = (data: { title: string; description: string; host: string; category: string; thumbnail: string }) => {
    if (editPodcast) {
      updatePodcast(editPodcast.id, data);
      toast.success("Podcast updated!");
    } else {
      addPodcast(data);
      toast.success("Podcast added!");
    }
    setEditPodcast(null);
  };

  const handleEdit = (podcast: Podcast) => {
    setEditPodcast(podcast);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePodcast(id);
    toast.success("Podcast deleted");
  };

  const handleDeleteEpisode = (podcastId: string, episodeId: string) => {
    deleteEpisode(podcastId, episodeId);
    toast.success("Episode deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="gradient-primary rounded-xl p-2.5">
              <Headphones className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">PodcastHub</h1>
              <p className="text-xs text-muted-foreground">Manage your podcasts</p>
            </div>
          </div>
          <Button
            onClick={() => { setEditPodcast(null); setFormOpen(true); }}
            className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4 mr-2" /> New Podcast
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsBar
          totalPodcasts={allPodcasts.length}
          totalEpisodes={totalEpisodes}
          categories={uniqueCategories}
        />

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        {podcasts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Headphones className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg">No podcasts found</p>
            <p className="text-sm">Try adjusting your search or add a new podcast</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {podcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddEpisode={addEpisode}
                onDeleteEpisode={handleDeleteEpisode}
              />
            ))}
          </div>
        )}
      </main>

      <PodcastFormDialog
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditPodcast(null); }}
        onSubmit={handleSubmit}
        editData={editPodcast}
      />
    </div>
  );
};

export default Index;
