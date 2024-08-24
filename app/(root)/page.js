import SongCard from "@/components/SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { lofiSongs, newSongs, relaxingSongs, romanseSongs } from "@/lib/catchedSong";

export default function Page() {

  return (
    <main className="px-6 py-5">
      <div>
        <h1 className="text-base font-medium">Most Popular</h1>
        <p className="text-xs text-muted-foreground">Most listened songs in this week.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {newSongs.map((song) => (
              <SongCard key={song.id} image={song.image} album={song.album} title={song.song} artist={song.primary_artists} id={song.id} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-8">
        <h1 className="text-base font-medium">Relaxing</h1>
        <p className="text-xs text-muted-foreground">Most listened relaxing songs.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {relaxingSongs.map((song) => (
              <SongCard key={song.id} image={song.image} album={song.album} title={song.song} artist={song.primary_artists} id={song.id} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-8">
        <h1 className="text-base font-medium">Romanse</h1>
        <p className="text-xs text-muted-foreground">Most listened romanse songs.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {romanseSongs.map((song) => (
              <SongCard key={song.id} image={song.image} album={song.album} title={song.song} artist={song.primary_artists} id={song.id} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-8">
        <h1 className="text-base font-medium">Lofi</h1>
        <p className="text-xs text-muted-foreground">Most listened lofi songs.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {lofiSongs.map((song) => (
              <SongCard key={song.id} image={song.image} album={song.album} title={song.song} artist={song.primary_artists} id={song.id} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </main>
  )
}