"use client"
import ArtistCard from "@/components/cards/artist";
import SongCard from "@/components/cards/song";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getSongsByQuery, searchAlbumByQuery } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Page() {
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [albums, setAlbums] = useState([]);

  const getSongs = async (e, type) => {
    const get = await getSongsByQuery(e);
    const data = await get.json();
    console.log(data.data.results);
    if (type === "latest") {
      setLatest(data.data.results);
    } else if (type === "popular") {
      setPopular(data.data.results);
    }
  };

  const getAlbum = async () => {
    const get = await searchAlbumByQuery("latest");
    const data = await get.json();
    setAlbums(data.data.results);
  };

  useEffect(() => {
    getSongs("latest", "latest");
    getSongs("action", "popular");
    getAlbum();
  }, []);

  return (
    <main className="px-6 py-5 md:px-20 lg:px-32">
      <div>
        <h1 className="text-base font-medium">Latest Songs</h1>
        <p className="text-xs text-muted-foreground">Top new released songs.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {latest.length ? latest.map((song) => (
              <SongCard key={song.id} image={song.image[2].url} album={song.album} title={song.name} artist={song.artists.primary[0].name} id={song.id} />
            )) : (
              <>
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-8">
        <h1 className="text-base font-medium">Popular Songs</h1>
        <p className="text-xs text-muted-foreground">Most played songs in this week.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {popular.length ? popular.map((song) => (
              <SongCard key={song.id} id={song.id} image={song.image[2].url} title={song.name} artist={song.artists.primary[0].name} />
            )) : (
              <>
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-8">
        <h1 className="text-base font-medium">Latest Albums</h1>
        <p className="text-xs text-muted-foreground">Top new released albums.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {albums.length ? albums.map((song) => (
              <SongCard key={song.id} image={song.image[2].url} album={song.album} title={song.name} artist={song.artists.primary[0].name} id={`album/${song.id}`} />
            )) : (
              <>
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
                <SongCard />
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="mt-8">
        <h1 className="text-base font-medium">Top Artists</h1>
        <p className="text-xs text-muted-foreground">Most searched artists in this week.</p>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-3">
            {latest.length ? [...new Set(latest.map(a => a.artists.primary[0].id))].map(id => (
              <ArtistCard key={id} id={id} image={latest.find(a => a.artists.primary[0].id === id).artists.primary[0].image[2]?.url || "https://github.githubassets.com/assets/mona-loading-dark-7701a7b97370.gif"} name={latest.find(a => a.artists.primary[0].id === id).artists.primary[0].name} />
            )) : (
              <>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </main>
  )
}
