"use client"

import { Button } from "./ui/button"
import { Pause, Play } from "lucide-react"
import { Slider } from "./ui/slider"
import { useRef, useState } from "react";
import { getSongsById } from "@/lib/fetch";
import Link from "next/link";

export default function MiniPlayer({ image, title, artist, id }) {
    const [currTime, setCurrTime] = useState("00");
    const [duration, setDuration] = useState("00");
    const [playing, setPlaying] = useState(false);
    const [src, setSrc] = useState("");

    const audioRef = useRef();

    const getSong = () => {
        try {
            const get = getSongsById(id);
            get
                .then((res) => res.json())
                .then((data) => {
                    setSrc(data.media_url);
                });
        }
        catch (e) {
            console.log(e);
        }
    };

    if (id) {
        getSong();
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const togglePlayPause = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const handleSeek = (e) => {
        const seekTime = e[0];
        audioRef.current.currentTime = seekTime;
        setCurrTime(seekTime);
    };

    return (
        <div className="z-10 fixed bottom-0 md:gap-5 gap-3 left-0 right-0 bg-background border-t py-3 md:py-4 px-4 md:px-20 flex items-center justify-between md:justify-center">
            <audio src={src} onLoadedData={(e) => { setDuration(e.target.duration); }} onTimeUpdate={(e) => setCurrTime(e.target.currentTime)} ref={audioRef} ></audio>
            <Link href={"/" + id}>
                <img src={image} className="h-16 w-16 min-h-16 min-w-16 rounded-3xl" />
            </Link>
            <div className="w-full grid gap-2 md:max-w-[400px]">
                <div className="grid">
                    <Link href={"/" + id}><h1 className="text-sm font-bold">{title}</h1></Link>
                    <Link href={"/" + id}><p className="text-xs -mt-1">{artist}</p></Link>
                </div>
                <Slider className="w-full max-w-[400px]" onValueChange={handleSeek} value={[currTime]} max={duration} />
                <div className="flex items-center max-w-[400px] justify-between">
                    <span className="text-xs">{formatTime(currTime)}</span>
                    <span className="text-xs">{formatTime(duration)}</span>
                </div>
            </div>
            <div>
                <Button size="icon" onClick={togglePlayPause}>
                    {playing ? (
                        <Pause className="h-5 w-5" />
                    ) : (
                        <Play className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </div>
    )
}