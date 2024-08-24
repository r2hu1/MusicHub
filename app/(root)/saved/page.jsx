"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SongCard from "@/components/cards/song";
import { useEffect, useState } from "react";
import { getSongsById } from "@/lib/fetch";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        let saved = localStorage.getItem("saved");
        if (saved != null) {
            let ids = saved.split(" ");
            let data = await Promise.all(ids.map(id => getSongsById(id)));
            let songs = await Promise.all(data.map(song => song.json()));
            setData(songs.filter(song => song.song != null));
            setLoading(false);
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
                {!loading && data.length > 0 && (
                    <ScrollArea className="rounded-md mt-4">
                        <div className="flex gap-3">
                            {data.map((song) => (
                                <SongCard key={song.id} image={song.image} album={song.album} title={song.song} artist={song.primary_artists} id={song.id} />
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="hidden" />
                    </ScrollArea>
                )}
                {!loading && data.length <= 0 && (
                    <div className="h-[300px] w-full flex items-center justify-center text-center border border-border rounded-md">
                        <p className="text-sm text-muted-foreground">No saved songs. <br /> Try saving some songs!</p>
                    </div>
                )}
                {loading && (
                    <div>
                        <ScrollArea className="rounded-md mt-4">
                            <div className="flex gap-3">
                                <div className="grid gap-2">
                                    <Skeleton className="h-[200px] w-[200px]" />
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-20 -mt-1" />
                                </div>
                                <div className="grid gap-2">
                                    <Skeleton className="h-[200px] w-[200px]" />
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-20 -mt-1" />
                                </div>
                                <div className="grid gap-2">
                                    <Skeleton className="h-[200px] w-[200px]" />
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-20 -mt-1" />
                                </div>
                                <div className="grid gap-2">
                                    <Skeleton className="h-[200px] w-[200px]" />
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-20 -mt-1" />
                                </div>
                            </div>
                            <ScrollBar orientation="horizontal" className="hidden" />
                        </ScrollArea>
                    </div>
                )}
            </div>
        </main>
    )
}