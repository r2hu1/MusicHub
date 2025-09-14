"use client";

import AlbumCard from "@/components/cards/album";
import Next from "@/components/cards/next";
import SongCard from "@/components/cards/song";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useNextMusicProvider } from "@/hooks/use-context";
import { getSongsSuggestions } from "@/lib/fetch";
import { useContext, useEffect, useState } from "react";

export default function Recomandation({ id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const next = useNextMusicProvider();

  const getData = async () => {
    await getSongsSuggestions(id)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setData(data.data);
          let d = data.data[Math.floor(Math.random() * data?.data?.length)];
          next.setNextData({
            id: d.id,
            name: d.name,
            artist: d.artists.primary[0]?.name || "unknown",
            album: d.album.name,
            image: d.image[1].url,
          });
        } else {
          setData(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="py-10 px-6 md:px-20 lg:px-32">
      <div>
        <h1 className="text-base font-medium">Recomandation</h1>
        <p className="text-xs text-muted-foreground">You might like this</p>
      </div>
      <div className="rounded-md mt-6">
        {!loading && data && (
          <div className="grid sm:grid-cols-2 gap-3 overflow-hidden">
            {data.map((song) => (
              <Next
                next={false}
                key={song.id}
                image={song.image[2].url}
                name={song.name}
                artist={song.artists.primary[0]?.name || "unknown"}
                id={song.id}
              />
            ))}
          </div>
        )}
        {loading && (
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
        )}
      </div>
      {!loading && !data && (
        <div className="flex items-center justify-center border text-center h-[100px]">
          <p className="text-sm text-muted-foreground">
            No recomandation for this song.
          </p>
        </div>
      )}
    </section>
  );
}
