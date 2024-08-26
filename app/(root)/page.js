import SongCard from "@/components/cards/song";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { lofiSongs, nAlbums, newSongs, relaxingSongs, romanseSongs } from "@/lib/catchedSong";

export default function Page() {

  return (
    <main className="px-6 py-5 md:px-20 lg:px-32">
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
        <h1 className="text-base font-medium">Albums</h1>
        <p className="text-xs text-muted-foreground">Most played recent albums.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {nAlbums.map((song) => (
              <SongCard key={song.id} id={`album/${song.id}`} image={song.image} title={song.name} artist={song.artists.primary[0].name} />
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