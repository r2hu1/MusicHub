"use client"
import AlbumCard from "@/components/cards/album";
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
    getSongs("trending", "popular");
    getAlbum();
  }, []);

  return (
    <main className="px-6 py-5 md:px-20 lg:px-32">
      <div>
        <div className="grid">
          <h1 className="text-base">Songs</h1>
          <p className="text-xs text-muted-foreground">Top new released songs.</p>
        </div>
        <ScrollArea className="rounded-md mt-4">
          <div className="flex gap-4">
            {latest.length ? latest.slice().map((song) => (
              <SongCard key={song.id} image={song.image[2].url} album={song.album} title={song.name} artist={song.artists.primary[0].name} id={song.id} />
            )) : Array.from({ length: 10 }).map((_, i) => <SongCard key={i} />)}
          </div>
          <ScrollBar orientation="horizontal" className="hidden sm:flex" />
        </ScrollArea>
      </div>

      <div className="mt-14">
        <h1 className="text-base">Albums</h1>
        <p className="text-xs text-muted-foreground">Top new released albums.</p>
        <ScrollArea className="rounded-md mt-6">
          <div className="flex gap-4">
            {albums.length ? albums.slice().map((song) => (
              <AlbumCard key={song.id} lang={song.language} image={song.image[2].url} album={song.album} title={song.name} artist={song.artists.primary[0].name} id={`album/${song.id}`} />
            )) : Array.from({ length: 10 }).map((_, i) => <SongCard key={i} />)}
          </div>
          <ScrollBar orientation="horizontal" className="hidden sm:flex" />
        </ScrollArea>
      </div>

      <div className="mt-12">
        <h1 className="text-base">Artists</h1>
        <p className="text-xs text-muted-foreground">Most searched artists.</p>
        <ScrollArea className="rounded-md mt-6">
          <div className="flex gap-4">
            {latest.length ? [...new Set(latest.map(a => a.artists.primary[0].id))].map(id => (
              <ArtistCard key={id} id={id} image={latest.find(a => a.artists.primary[0].id === id).artists.primary[0].image[2]?.url || `https://az-avatar.vercel.app/api/avatar/?bgColor=0f0f0f0&fontSize=60&text=${latest.find(a => a.artists.primary[0].id === id).artists.primary[0].name.split("")[0].toUpperCase() || "UN"}`} name={latest.find(a => a.artists.primary[0].id === id).artists.primary[0].name} />
            )) : Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="grid gap-2">
                <Skeleton className="h-[100px] w-[100px] rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden sm:flex" />
        </ScrollArea>
      </div>

      <div className="mt-12">
        <h1 className="text-base">Trending</h1>
        <p className="text-xs text-muted-foreground">Most played songs in this week.</p>
        <ScrollArea className="rounded-md mt-6">
          <div className="flex gap-4">
            {popular.length ? popular.map((song) => (
              <SongCard key={song.id} id={song.id} image={song.image[2].url} title={song.name} artist={song.artists.primary[0].name} />
            )) : Array.from({ length: 10 }).map((_, i) => <SongCard key={i} />)}
          </div>
          <ScrollBar orientation="horizontal" className="hidden sm:flex" />
        </ScrollArea>
      </div>
    </main>
  )
}
