import SongCard from "@/components/SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { lofiSongs, newSongs, relaxingSongs, romanseSongs } from "@/lib/catchedSong";

export default function Page() {
  const rap = newSongs;
  const relaxing = relaxingSongs;
  const lofi = lofiSongs;
  const romance = romanseSongs;

  return (
    <div className="px-6 md:px-20 py-10 grid gap-5 -mb-10 md:w-fit md:mx-auto mt-3">

      <div className="-mb-[3px]">
        <h1 className="font-bold text-lg">🔥 Trending<span className="text-primary">.</span></h1>
        <p className="-mt-1 text-xs">trending songs in india</p>
      </div>

      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-6 items-center">
          {rap.map((song) => (
            <SongCard key={song.id} id={song.id} image={song.image} artist={song.singers || "unknown"} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="-mb-[3px]">
        <h1 className="font-bold text-lg">🎧 Relaxing<span className="text-primary">.</span></h1>
        <p className="-mt-1 text-xs">top relaxing songs for peace</p>
      </div>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-6 items-center">
          {relaxing.map((song) => (
            <SongCard key={song.id} artist={song.singers || "unknown"} id={song.id} image={song.image} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="-mb-[3px]">
        <h1 className="font-bold text-lg">💞 Romanse<span className="text-primary">.</span></h1>
        <p className="-mt-1 text-xs">top romanse songs for mood</p>
      </div>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-6 items-center">
          {romance.map((song) => (
            <SongCard key={song.id} id={song.id} artist={song.singers || "unknown"} image={song.image} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="-mb-[3px]">
        <h1 className="font-bold text-lg">💤 Lofi<span className="text-primary">.</span></h1>
        <p className="-mt-1 text-xs">top lofi songs to chill</p>
      </div>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-6 items-center">
          {lofi.map((song) => (
            <SongCard key={song.id} id={song.id} artist={song.singers || "unknown"} image={song.image} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

    </div>
  )
}