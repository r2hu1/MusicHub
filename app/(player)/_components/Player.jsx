"use client"
import { Button } from "@/components/ui/button";
import { getSongsById, getSongsLyricsById } from "@/lib/fetch";
import { Download, Pause, Play, RedoDot, UndoDot, Repeat, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import toast from 'react-hot-toast';

export default function Player({ params }) {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

    const getSong = async () => {
        const get = await getSongsById(params.id);
        const data = await get.json();
        setData(data);
    };


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

    const downloadSong = async () => {
        setIsDownloading(true);
        const response = await fetch(data.media_url);
        const datas = await response.blob();
        const url = URL.createObjectURL(datas);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.song}.mp3`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('downloaded');
        setIsDownloading(false);
    };

    const handleSeek = (e) => {
        const seekTime = e[0];
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const loopSong = () => {
        audioRef.current.loop = !audioRef.current.loop;
        setIsLooping(!isLooping);
    };

    const changeRight = () => {
        audioRef.current.currentTime = audioRef.current.currentTime + 10;
    }
    const changeLeft = () => {
        audioRef.current.currentTime = audioRef.current.currentTime - 10;
    };
    useEffect(() => {
        getSong();
        const handleTimeUpdate = () => {
            try {
                setCurrentTime(audioRef.current.currentTime);
                setDuration(audioRef.current.duration);
            }
            catch (e) {
                setPlaying(false);
            }
        };
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);
    return (
        <div className="mb-3 mt-2">
            <audio onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedData={() => setDuration(audioRef.current.duration)} src={data.media_url} ref={audioRef}></audio>
            <div className="grid gap-6 px-6">
                <div className="grid text-center place-content-center gap-3">
                    <div>
                        {!data.image ? (
                            <Skeleton className="w-[200px] rounded-full h-[200px] mx-auto" />
                        ) : (
                            <img src={data.image} className="h-full rounded-full max-w-[200px] object-cover mx-auto" />
                        )}
                    </div>
                    {!data.song ? (
                        <Skeleton className="h-5 w-32 mx-auto mb-1" />
                    ) : (
                        <h1 className="text-lg mx-auto font-bold md:max-w-lg max-w-[260px]">{data.song}</h1>
                    )}
                    <p className="text-xs -mt-4 max-w-xl mx-auto">{data.singers || "unknown"}</p>
                </div>
                <Slider onValueChange={handleSeek} value={[currentTime]} max={duration} className="w-full max-w-[400px] mx-auto" />
                {!duration ? (
                    <div className="-mt-6 -mb-3 w-full max-w-[400px] mx-auto flex items-center justify-between">
                        <Skeleton className="h-[9px] w-10" />
                        <Skeleton className="h-[9px] w-10" />
                    </div>
                ) : (
                    <div className="-mt-6 -mb-3 w-full max-w-[400px] mx-auto flex items-center justify-between">
                        <span className="text-xs">{formatTime(currentTime)}</span>
                        <span className="text-xs">{formatTime(duration)}</span>
                    </div>
                )}
                {
                    data.media_url ? (
                        <div className="flex items-center justify-center gap-4">
                            <Button size="icon" variant={isLooping ? "default" : "secondary"} onClick={loopSong}>
                                <Repeat className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center justify-center gap-2">
                                <Button size="icon" onClick={changeRight}><RedoDot className="h-4 w-4" /></Button>
                                <Button size="icon" onClick={togglePlayPause}>
                                    {playing ? (
                                        <Pause className="h-4 w-4" />
                                    ) : (
                                        <Play className="h-4 w-4" />
                                    )}
                                </Button>
                                <Button size="icon" onClick={changeLeft}><UndoDot className="h-4 w-4 transition" /></Button>
                            </div>
                            <Button size="icon" variant="secondary" onClick={downloadSong}>
                                {isDownloading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Download className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-4">
                            <Skeleton className="h-10 w-10" />
                            <div className="flex items-center justify-center gap-2">
                                <Skeleton className="h-10 w-10" />
                                <Skeleton className="h-10 w-10" />
                                <Skeleton className="h-10 w-10" />
                            </div>
                            <Skeleton className="h-10 w-10" />
                        </div>
                    )
                }
            </div >
        </div >
    )
}
