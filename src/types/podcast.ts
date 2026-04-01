export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  duration: string;
  audioUrl: string;
  publishDate: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  host: string;
  category: string;
  thumbnail: string;
  createdAt: string;
  episodes: Episode[];
}

export const CATEGORIES = [
  "Technology",
  "Business",
  "Science",
  "Health",
  "Education",
  "Entertainment",
  "News",
  "Sports",
  "Music",
  "Comedy",
] as const;
