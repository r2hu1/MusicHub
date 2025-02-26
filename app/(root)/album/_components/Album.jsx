"use client"

import AlbumCard from "@/components/cards/album";
import SongCard from "@/components/cards/song";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getAlbumById } from "@/lib/fetch";
import { useEffect, useState } from "react"

export default function Album({ id }) {
    const [data, setData] = useState([]);

    const getData = async () => {
        await getAlbumById(id)
            .then(res => res.json())
            .then(data => {
                setData(data.data);
            });
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <main className="px-6 md:px-20 lg:px-32 py-5">
            {data.image ? (
                <div>
                    <div className="md:flex gap-10">
                        <img src={data.image[2]?.url} alt={data.name} className="w-full md:w-[200px] md:h-[200px] rounded-2xl" />
                        <div className="mt-5 mb-1">
                            <h1 className="text-xl font-medium">{data.name}</h1>
                            <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
                            <p className="text-sm text-muted-foreground mb-1">by <span className="text-primary">{data.artists.primary.map(artist => artist.name).join(",")}</span></p>
                            <Badge>
                                {data.songCount} songs
                            </Badge>
                        </div>
                    </div>
                    <div className="mt-12">
                        <ScrollArea className="rounded-md mt-4">
                            <div className="flex gap-3">
                                {data.songs.map((song) => (
                                    <SongCard key={song.id} image={song.image[2].url} title={song.name} artist={song.artists.primary[0].name} id={song.id} />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="hidden sm:flex" />
                        </ScrollArea>
                    </div>
                </div>
            ) : (
                <>
                    <Skeleton className="md:h-[200px] md:w-[200px] rounded-2xl w-full h-[400px]" />
                    <Skeleton className="h-4 mt-4 w-32" />
                    <Skeleton className="h-3 mt-3 mb-1.5 w-40" />
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-6 mt-2 mb-8 w-20" />
                    <ScrollArea className="rounded-md mt-4">
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
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" className="hidden sm:flex" />
                    </ScrollArea>
                </>
            )
            }
        </main >
    )
}