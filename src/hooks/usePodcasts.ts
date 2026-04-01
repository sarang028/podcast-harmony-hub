import { useState, useCallback, useMemo } from "react";
import type { Podcast, Episode } from "@/types/podcast";
import { seedPodcasts } from "@/data/seed";

export function usePodcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>(seedPodcasts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const addPodcast = useCallback((data: Omit<Podcast, "id" | "createdAt" | "episodes">) => {
    const newPodcast: Podcast = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().split("T")[0],
      episodes: [],
    };
    setPodcasts((prev) => [newPodcast, ...prev]);
  }, []);

  const updatePodcast = useCallback((id: string, data: Omit<Podcast, "id" | "createdAt" | "episodes">) => {
    setPodcasts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }, []);

  const deletePodcast = useCallback((id: string) => {
    setPodcasts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addEpisode = useCallback((podcastId: string, data: Omit<Episode, "id" | "podcastId">) => {
    const newEpisode: Episode = {
      ...data,
      id: crypto.randomUUID(),
      podcastId,
    };
    setPodcasts((prev) =>
      prev.map((p) =>
        p.id === podcastId ? { ...p, episodes: [...p.episodes, newEpisode] } : p
      )
    );
  }, []);

  const deleteEpisode = useCallback((podcastId: string, episodeId: string) => {
    setPodcasts((prev) =>
      prev.map((p) =>
        p.id === podcastId
          ? { ...p, episodes: p.episodes.filter((e) => e.id !== episodeId) }
          : p
      )
    );
  }, []);

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [podcasts, searchQuery, categoryFilter]);

  const totalEpisodes = useMemo(
    () => podcasts.reduce((sum, p) => sum + p.episodes.length, 0),
    [podcasts]
  );

  return {
    podcasts: filteredPodcasts,
    allPodcasts: podcasts,
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
  };
}
