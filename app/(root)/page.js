"use client"
import SongCard from "@/components/SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getSongsByQuery } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Page() {
  const [hot, setHot] = useState([]);
  const [relaxing, setRelaxing] = useState([]);
  const [romance, setRomance] = useState([]);
  const [lofi, setLofi] = useState([]);

  const getHot = async () => {
    const get = await getSongsByQuery("hot");
    const data = await get.json();
    setHot(data);
  };

  const getRelaxing = async () => {
    const get = await getSongsByQuery("relaxing");
    const data = await get.json();
    setRelaxing(data);
  };

  const getRomance = async () => {
    const get = await getSongsByQuery("romanse");
    const data = await get.json();
    setRomance(data);
  }

  const getLofi = async () => {
    const get = await getSongsByQuery("lofi");
    const data = await get.json();
    setLofi(data);
    console.log(data);
  }

  useEffect(() => {
    getHot();
    getRelaxing();
    getRomance();
    getLofi();
  }, []);

  return (
    <div className="px-6 md:px-20 py-10 grid gap-5 -mb-10">
      <div className="-mb-3">
        <h1 className="font-bold text-lg">🔥Hot<span className="text-primary">.</span></h1>
      </div>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-2 items-center md:justify-center">
          {!hot.length && (
            <div className="flex gap-2">
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
            </div>
          )}
          {hot.map((song) => (
            <SongCard key={song.id} id={song.id} image={song.image} artist={song.artistMap[0]} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="-mb-3">
        <h1 className="font-bold text-lg">🎧Relaxing<span className="text-primary">.</span></h1>
      </div>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-2 items-center md:justify-center">
          {!relaxing.length && (
            <div className="flex gap-2">
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
            </div>
          )}
          {relaxing.map((song) => (
            <SongCard key={song.id} id={song.id} image={song.image} artist={song.artistMap[0]} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="-mb-3">
        <h1 className="font-bold text-lg">💞Romanse<span className="text-primary">.</span></h1>
      </div>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-2 items-center md:justify-center">
          {!romance.length && (
            <div className="flex gap-2">
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
            </div>
          )}
          {romance.map((song) => (
            <SongCard key={song.id} id={song.id} image={song.image} artist={song.artistMap[0]} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="-mb-3">
        <h1 className="font-bold text-lg">💤Lofi<span className="text-primary">.</span></h1>
      </div>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex gap-2 items-center md:justify-center">
          {!lofi.length && (
            <div className="flex gap-2">
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <div className="rounded-md w-[220px] h-[175px] md:h-[260px] resize-none object-cover grid gap-2">
                <div>
                  <Skeleton className="w-[190px] h-[140px] md:h-[200px] rounded-md" />
                </div>
                <div>
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
            </div>
          )}
          {lofi.map((song) => (
            <SongCard key={song.id} id={song.id} image={song.image} artist={song.artistMap[0]} title={song.song} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}