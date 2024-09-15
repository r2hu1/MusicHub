"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ExternalLink, Link2Icon, Pause, Play, Repeat, Repeat1, X } from "lucide-react";
import { Slider } from "../ui/slider";
import { getSongsById } from "@/lib/fetch";
import Link from "next/link";
import { MusicContext } from "@/hooks/use-context";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export default function Player() {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioURL, setAudioURL] = useState("");
    const [isLooping, setIsLooping] = useState(false);
    const values = useContext(MusicContext);

    const getSong = async () => {
        const get = await getSongsById(values.music);
        const data = await get.json();
        setData(data.data[0]);
        if (data?.data[0]?.downloadUrl[2]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[2]?.url);
        } else if (data?.data[0]?.downloadUrl[1]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[1]?.url);
        } else {
            setAudioURL(data?.data[0]?.downloadUrl[0]?.url);
        }
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

    useEffect(() => {
        if (values.music) {
            getSong();
            if (localStorage.getItem("c")) {
                audioRef.current.currentTime = parseFloat(localStorage.getItem("c") + 1);
                localStorage.removeItem("c");
            }
            setPlaying(localStorage.getItem("p") == "true" && true || !localStorage.getItem("p") && true);
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
        }
    }, [values.music]);
    return (
        <main>
            <audio autoPlay={playing} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedData={() => setDuration(audioRef.current.duration)} src={audioURL} ref={audioRef}></audio>
            {values.music && <div className="shadow-lg fixed flex items-center rounded-md m-2.5 bottom-0 right-0 left-0 border-border overflow-hidden border z-50 bg-background p-3 md:ml-16 md:mr-16 lg:ml-28 lg:mr-28 gap-3">
                <div className="relative">
                    <Button size="icon" variant="secondary" className="h-full w-full bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm absolute z-10" onClick={togglePlayPause}>{playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}</Button>
                    <img src={data.image ? data?.image[1]?.url : ""} alt={data?.name} className="rounded-md h-20 min-w-20 hover:opacity-85 transition" />
                    <img src={data.image ? data?.image[1]?.url : ""} alt={data?.name} className="rounded-md h-[110%] min-w-[110%] opacity-40 hidden dark:block absolute top-0 left-0 right-0 blur-3xl -z-10" />
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between mb-2 w-full">
                        <div>
                            {!data?.name ? <Skeleton className="h-4 w-32" /> : (
                                <>
                                    <Link href={`/${values.music}?c=${currentTime}`} className="text-base hover:opacity-85 transition font-medium flex md:hidden gap-2 items-center">{data?.name?.slice(0, 10)}{data?.name?.length >= 11 ? ".." : ""}<Link2Icon className="h-3.5 w-3.5 text-muted-foreground" /></Link>
                                    <Link href={`/${values.music}?c=${currentTime}`} className="text-base hover:opacity-85 transition font-medium gap-2 items-center hidden md:flex">{data?.name}<Link2Icon className="h-3.5 w-3.5 text-muted-foreground" /></Link>
                                </>
                            )}
                            {!data?.artists?.primary[0]?.name ? <Skeleton className="h-3 w-14 mt-1" /> : (
                                <>
                                    <h2 className="block md:hidden text-xs -mt-0.5 text-muted-foreground">by <span className="text-foreground">{data?.artists?.primary[0]?.name.slice(0, 20)}{data?.artists?.primary[0]?.name.length > 20 ? ".." : ""}</span></h2>
                                    <h2 className="hidden md:block text-xs -mt-0.5 text-muted-foreground">by <span className="text-foreground">{data?.artists?.primary[0]?.name}</span></h2>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 -mt-3.5">
                            {/* <Button asChild size="icon" className="p-0 h-8 w-8" variant={"outline"}>
                                <Link href={`/${values.music}?c=${currentTime}`}><ExternalLink className="h-3.5 w-3.5" /></Link>
                            </Button> */}
                            <Button size="icon" className="p-0 h-8 w-8" variant={!isLooping ? "outline" : "secondary"} onClick={loopSong}>
                                {!isLooping ? <Repeat className="h-3.5 w-3.5" /> : <Repeat1 className="h-3.5 w-3.5" />}
                            </Button>
                            <Button size="icon" className="p-0 h-8 w-8" onClick={() => { values.setMusic(null); localStorage.clear(); audioRef.current.currentTime = 0; }}>
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full grid gap-1">
                        {!duration ? <Skeleton className="h-2 w-full" /> : (
                            <Slider onValueChange={handleSeek} value={[currentTime]} max={duration} className="w-full" />
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
                            {!duration ? <Skeleton className="h-3 w-10" /> : (
                                <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>}
        </main >
    )
}
