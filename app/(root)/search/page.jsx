"use client";
import ArtistCard from "@/components/ArtistCard";
import SongCard from "@/components/SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { newSongs } from "@/lib/catchedSong";
import { getSongsByQuery } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Search(params) {
    const rap = newSongs;
    const query = params.searchParams.query;

    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const getSongs = async () => {
        const get = await getSongsByQuery(query);
        const data = await get.json();
        setSongs(data);
        console.log(data);
    }
    useEffect(() => {
        getSongs();
    }, []);

    return (
        <div className="py-20 -mt-5 px-6 md:px-20">
            <div className="mb-10 -mt-12 text-center">
                <h1 className="text-sm">Search results for <span className="text-primary">{query}</span></h1>
            </div>

            <div className="grid gap-4">
                <div className="mt-2">
                    <h1 className="text-lg font-bold">Songs<span className="text-primary">.</span></h1>
                </div>
                <ScrollArea className="whitespace-nowrap pb-4">
                    <div className="flex gap-6">
                        {songs.map((song) => (
                            <SongCard key={song.id} id={song.id} image={song.image} artist={song.singers || "unknown"} title={song.song} />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <div className="mt-5">
                    <h1 className="text-lg font-bold">Artists<span className="text-primary">.</span></h1>
                </div>
                <div className="flex gap-6 flex-wrap">
                    {songs.length && (
                        <div className="flex gap-6">
                            <ArtistCard image={songs[0].image} name={songs[0].singers} />
                            <ArtistCard image={songs[1].image} name={songs[1].singers} />
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <h1 className="font-bold text-lg">🔥 Trending<span className="text-primary">.</span></h1>
                </div>
                <ScrollArea className="whitespace-nowrap pb-4">
                    <div className="flex gap-6 items-center md:justify-center">
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