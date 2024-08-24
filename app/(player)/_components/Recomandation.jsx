"use client"

import SongCard from "@/components/SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getSongsSuggestions } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Recomandation({id}) {
    const [data, setData] = useState([]);
    const getData = async () => {
        await getSongsSuggestions(id)
        .then(res=>res.json())
        .then(data=>{
            setData(data.data);
            console.log(data);
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
            <div>
                <ScrollArea className="rounded-md mt-4">
                    <div className="flex gap-3">
                        {data.map((song) => (
                            <SongCard key={song.id} image={song.image[2].url} album={song.album.name} title={song.name} artist={song.artists.primary[0].name} id={song.id} />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
        </section>
    )
}