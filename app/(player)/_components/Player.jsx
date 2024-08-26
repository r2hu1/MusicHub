"use client"
import { Button } from "@/components/ui/button";
import { getSongsById, getSongsLyricsById } from "@/lib/fetch";
import { Download, Pause, Play, RedoDot, UndoDot, Repeat, Loader2, Bookmark, BookmarkCheck, Repeat1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function Player({ id }) {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const getSong = async () => {
        const get = await getSongsById(id);
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
        if (isLooping) {
            toast.success('Removed from Loop!');
        } else {
            toast.success('Added to Loop!');
        }
    };

    const handleAddToBookmark = () => {
        let exisn = localStorage.getItem("saved");
        if (exisn != null && exisn.split(" ").find(e => e == id)) {
            localStorage.setItem("saved", exisn.split(" ").filter(e => e != id).join(" "));
            setIsSaved(false);
            return toast.success('Removed from Bookmarks!');
        }
        setIsSaved(true);
        localStorage.setItem("saved", `${exisn != null ? exisn : ""} ${id}`);
        toast.success('Saved to Bookmarks!');
    };

    useEffect(() => {
        getSong();
        let exisn = localStorage.getItem("saved");
        if (exisn != null && exisn.split(" ").find(e => e == id)) {
            setIsSaved(true);
        }
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
        <div className="mb-3 mt-5">
            <audio onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedData={() => setDuration(audioRef.current.duration)} src={data.media_url} ref={audioRef}></audio>
            <div className="grid gap-6 w-full">
                <div className="sm:flex px-6 md:px-20 lg:px-32 grid gap-5 w-full">
                    <div>
                        {!data.image ? (
                            <Skeleton className="md:w-[130px] rounded-2xl md:h-[150px] w-full h-[400px]" />
                        ) : (
                            <img src={data.image} className="sm:h-[150px] h-full bg-secondary/50 rounded-2xl sm:w-[200px] w-full object-cover" />
                        )}
                    </div>
                    {!data.song ? (
                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <Skeleton className="h-4 w-36 mb-2" />
                                <Skeleton className="h-3 w-16 mb-4" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-full rounded-full mb-2" />
                                <div className="w-full flex items-center justify-between">
                                    <Skeleton className="h-[9px] w-6" />
                                    <Skeleton className="h-[9px] w-6" />
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <h1 className="text-xl font-bold md:max-w-lg max-w-[260px]">{data.song}</h1>
                                <p className="text-xs text-muted-foreground">{data.singers || "unknown"}</p>
                            </div>
                            <div className="grid gap-2 w-full mt-5 sm:mt-0">
                                <Slider onValueChange={handleSeek} value={[currentTime]} max={duration} className="w-full" />
                                <div className="w-full flex items-center justify-between">
                                    <span className="text-xs">{formatTime(currentTime)}</span>
                                    <span className="text-xs">{formatTime(duration)}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3 sm:mt-0">
                                        <Button size="icon" variant="outline" onClick={loopSong}>
                                            {!isLooping ? <Repeat className="h-4 w-4" /> : <Repeat1 className="h-4 w-4" />}
                                        </Button>
                                        <Button size="icon" variant={playing ? "gooeyRight" : "gooeyLeft"} onClick={togglePlayPause}>
                                            {playing ? (
                                                <Pause className="h-4 w-4" />
                                            ) : (
                                                <Play className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button size="icon" variant="outline" onClick={downloadSong}>
                                            {isDownloading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Download className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <Button size="icon" variant="outline" onClick={handleAddToBookmark}>{!isSaved ? <Bookmark className="h-4 w-4" /> : <BookmarkCheck className="h-4 w-4" />}</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
