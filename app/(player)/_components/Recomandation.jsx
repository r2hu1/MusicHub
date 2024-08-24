"use client"

import SongCard from "@/components/cards/song";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getSongsSuggestions } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Recomandation({ id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        await getSongsSuggestions(id)
            .then(res => res.json())
            .then(data => {
                setData(data.data);
                setLoading(false);
            });
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <section className="py-10 px-6 md:px-20 lg:px-32">
            <div>
                <h1 className="text-base font-medium">Recomandation</h1>
                <p className="text-xs text-muted-foreground">Related to your search</p>
            </div>
            <ScrollArea className="rounded-md mt-4">
                {!loading && data && (
                    <div>
                        <div className="flex gap-3">
                            {data.map((song) => (
                                <SongCard key={song.id} image={song.image[2].url} album={song.album.name} title={song.name} artist={song.artists.primary[0].name} id={song.id} />
                            ))}
                        </div>
                    </div>
                )}
                {loading && (
                    <div className="flex gap-6">
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
                )}
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
            {!loading && !data && (
                <div className="flex items-center justify-center text-center h-[100px]">
                    <p className="text-sm text-muted-foreground">No recomandation for this song.</p>
                </div>
            )}
        </section>
    )
}