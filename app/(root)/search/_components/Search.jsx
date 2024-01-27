"use client";
import ArtistCard from "@/components/ArtistCard";
import SongCard from "@/components/SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { newSongs } from "@/lib/catchedSong";
import { getSongsByQuery } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Search({params}) {
    const rap = newSongs;
    const query = params.id;

    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const getSongs = async () => {
        const get = await getSongsByQuery(query);
        console.log(get);
        const data = await get.json();
        setSongs(data);
    }
    useEffect(() => {
        getSongs();
    }, params);

    return (
        <div className="py-20 -mt-9 px-6 md:px-20 md:w-fit md:mx-auto">
            <div className="grid gap-4">
                <div className="mt-2">
                    <h1 className="text-lg font-bold">🔎 Results<span className="text-primary">.</span></h1>
                    <p className="-mt-1 text-xs">search results for "{decodeURI(query)}"</p>
                </div>
                <ScrollArea className="whitespace-nowrap pb-4">
                    <div className="flex gap-6">
                        {songs.map((song) => (
                            <SongCard key={song.id} id={song.id} image={song.image} artist={song.singers || "unknown"} title={song.song} />
                        ))}
                    </div>
                    {!songs.length && (
                        <div className="flex gap-6">
                            <div className="grid place-items-center gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid place-items-center gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid place-items-center gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid place-items-center gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                        </div>
                    )}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <div className="mt-5">
                    <h1 className="text-lg font-bold">🎤 Artists<span className="text-primary">.</span></h1>
                    <p className="-mt-1 text-xs">artists related to "{decodeURI(query)}"</p>
                </div>
                <div className="flex gap-6 flex-wrap">
                    {songs[0] && (
                        <div className="flex gap-4">
                            {songs[0].singers && (
                                <ArtistCard image={songs[0].image} name={songs[0].singers} />
                            )}
                            {songs[1].singers != songs[0].singers && (
                                <ArtistCard image={songs[1].image} name={songs[1].singers} />
                            )}
                            {!songs[1].singers && !songs[0].singers && (
                                <ArtistCard name="unknown"/>
                            )}
                        </div>
                    )}
                    {!songs.length && (
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <h1 className="font-bold text-lg">🔥 Trending<span className="text-primary">.</span></h1>
                    <p className="-mt-1 text-xs">trending songs in india</p>
                </div>
                <ScrollArea className="whitespace-nowrap pb-4">
                    <div className="flex gap-6">
                        {rap.map((song) => (
                            <SongCard key={song.id} id={song.id} image={song.image} artist={song.singers || "unknown"} title={song.song} />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}