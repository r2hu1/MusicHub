"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SongCard from "@/components/cards/song";
import { useEffect, useState } from "react";
import { getSongsById } from "@/lib/fetch";

export default function Page() {
    const [data, setData] = useState([]);
    const getData = async () => {
        let saved = localStorage.getItem("saved");
        if (saved != null) {
            let ids = saved.split(" ");
            let data = await Promise.all(ids.map(id => getSongsById(id)));
            let songs = await Promise.all(data.map(song => song.json()));
            setData(songs.filter(song => song.song != null));
            console.log(songs.filter(song => song.song != null));
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <main className="px-6 py-5 md:px-20 lg:px-32">
            <div>
                <h1 className="text-base font-medium">Saved Songs</h1>
                <p className="text-xs text-muted-foreground">All of your Saved songs.</p>
                {data.length ? (
                    <ScrollArea className="rounded-md mt-4">
                        <div className="flex gap-3">
                            {data.map((song) => (
                                <SongCard key={song.id} image={song.image} album={song.album} title={song.song} artist={song.primary_artists} id={song.id} />
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="hidden" />
                    </ScrollArea>
                ) : (
                    <div className="h-[300px] w-full flex items-center justify-center text-center border border-border rounded-md mt-7">
                        <p className="text-sm text-muted-foreground">No saved songs. <br/> Try saving some songs!</p>
                    </div>
                )}
            </div>
        </main>
    )
}