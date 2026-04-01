import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  url: string;
  title: string;
}

export function AudioPlayer({ url, title }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  if (!url) return null;

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioRef} src={url} onEnded={() => setPlaying(false)} preload="none" />
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-primary hover:text-primary/80"
        onClick={toggle}
        title={`${playing ? "Pause" : "Play"} ${title}`}
      >
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
      </Button>
      <Volume2 className="h-3 w-3 text-muted-foreground" />
    </div>
  );
}
