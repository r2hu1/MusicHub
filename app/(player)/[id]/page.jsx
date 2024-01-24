"use client"

import { Button } from "@/components/ui/button";
import { getSongsById } from "@/lib/fetch";
import { Heart, Pause, Play, X } from "lucide-react";
import { useEffect, useState } from "react"

export default function Page({ params }) {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(false);

    const getSong = async () => {
        const get = await getSongsById(params.id);
        const data = await get.json();
        setData(data);
        console.log(data);
    }
    const playSong = () => {
        const audio = new Audio(data.media_url);
        if (playing) {
            audio.stop();
            setPlaying(false);
        }
        else {
            audio.play();
            setPlaying(true);
        }
    }
    const exitSong = () => { }
    const likeSong = () => { }
    useEffect(() => {
        getSong();
    }, []);
    return (
        <div className="py-20">
            <div className="grid gap-6">
                <div className="grid text-center place-content-center gap-2">
                    <img src={data.image} className="h-full rounded-full max-w-[220px] object-cover" />
                    <h1 className="text-lg font-bold">{data.song}</h1>
                </div>
                <div className="flex items-center justify-center gap-6">
                    <Button size="icon" variant="secondary" onClick={likeSong}>
                        <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={playSong}>
                        {playing ? (
                            <Pause className="h-5 w-5" />
                        ) : (
                            <Play className="h-5 w-5" />
                        )}
                    </Button>
                    <Button size="icon" variant="secondary" onClick={exitSong}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}