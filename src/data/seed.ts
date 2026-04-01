import type { Podcast } from "@/types/podcast";

export const seedPodcasts: Podcast[] = [
  {
    id: "1",
    title: "Tech Talks Daily",
    description: "Daily insights into the latest technology trends, startups, and innovations shaping the future.",
    host: "Sarah Chen",
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop",
    createdAt: "2024-01-15",
    episodes: [
      { id: "e1", podcastId: "1", title: "The Rise of AI Agents", duration: "42:15", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", publishDate: "2024-03-01" },
      { id: "e2", podcastId: "1", title: "Web3 in 2024", duration: "38:22", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", publishDate: "2024-03-08" },
    ],
  },
  {
    id: "2",
    title: "Mindful Business",
    description: "Exploring the intersection of mindfulness, leadership, and building sustainable businesses.",
    host: "James Rivera",
    category: "Business",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop",
    createdAt: "2024-02-10",
    episodes: [
      { id: "e3", podcastId: "2", title: "Leading with Empathy", duration: "35:10", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", publishDate: "2024-03-05" },
    ],
  },
  {
    id: "3",
    title: "Science Unplugged",
    description: "Breaking down complex scientific discoveries into engaging conversations for curious minds.",
    host: "Dr. Emily Park",
    category: "Science",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=400&fit=crop",
    createdAt: "2024-01-20",
    episodes: [
      { id: "e4", podcastId: "3", title: "CRISPR Revolution", duration: "45:30", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", publishDate: "2024-02-28" },
      { id: "e5", podcastId: "3", title: "Mars Colony Plans", duration: "50:05", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", publishDate: "2024-03-10" },
      { id: "e6", podcastId: "3", title: "Quantum Computing 101", duration: "40:18", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", publishDate: "2024-03-15" },
    ],
  },
  {
    id: "4",
    title: "Comedy Hour Live",
    description: "Stand-up comedians share their funniest stories and behind-the-scenes moments.",
    host: "Mike Torres",
    category: "Comedy",
    thumbnail: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=400&fit=crop",
    createdAt: "2024-03-01",
    episodes: [],
  },
  {
    id: "5",
    title: "Health & Hustle",
    description: "Practical wellness tips for busy professionals who want to thrive in work and life.",
    host: "Olivia Martinez",
    category: "Health",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    createdAt: "2024-02-20",
    episodes: [
      { id: "e7", podcastId: "5", title: "Morning Routines That Work", duration: "28:45", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", publishDate: "2024-03-12" },
    ],
  },
  {
    id: "6",
    title: "Code & Coffee",
    description: "Casual conversations about software engineering, open source, and developer culture.",
    host: "Alex Kim",
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    createdAt: "2024-01-05",
    episodes: [
      { id: "e8", podcastId: "6", title: "Rust vs Go in 2024", duration: "55:12", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", publishDate: "2024-03-02" },
      { id: "e9", podcastId: "6", title: "The Future of TypeScript", duration: "41:33", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", publishDate: "2024-03-09" },
    ],
  },
];
