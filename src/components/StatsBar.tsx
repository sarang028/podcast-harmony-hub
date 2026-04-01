import { Mic2, Radio, TrendingUp } from "lucide-react";

interface StatsBarProps {
  totalPodcasts: number;
  totalEpisodes: number;
  categories: number;
}

export function StatsBar({ totalPodcasts, totalEpisodes, categories }: StatsBarProps) {
  const stats = [
    { label: "Total Podcasts", value: totalPodcasts, icon: Mic2 },
    { label: "Total Episodes", value: totalEpisodes, icon: Radio },
    { label: "Categories", value: categories, icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:glow-primary"
        >
          <div className="gradient-primary rounded-lg p-3">
            <stat.icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
