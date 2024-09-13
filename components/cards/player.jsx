"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ExternalLink, Pause, Play } from "lucide-react";
import { Slider } from "../ui/slider";
import { getSongsById } from "@/lib/fetch";
import Link from "next/link";
import { MusicContext } from "@/hooks/use-context";

export default function Player() {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioURL, setAudioURL] = useState("");

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

    useEffect(() => {
        if (values.music) {
            getSong();
            setPlaying(true);
            const handleTimeUpdate = () => {
                try{
                    setCurrentTime(audioRef.current.currentTime);
                    setDuration(audioRef.current.duration);
                }
                catch(e){
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
            {values.music && <div className="fixed flex items-center bottom-0 right-0 w-full border-t left-0 z-50 bg-background/90 backdrop-blur-3xl p-3 gap-4">
                <Link href={`/${values.music}?c=${currentTime}`}>
                    <img src={data.image ? data?.image[1]?.url : ""} alt={data?.name} className="rounded-md h-20 min-w-20 hover:opacity-85 transition" />
                </Link>
                <div className="w-full">
                    <div className="flex items-center justify-between mb-2 w-full">
                        <div>
                            <Link href={`/${values.music}?c=${currentTime}`} className="text-base font-medium flex gap-2 items-center">{data?.name} <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" /></Link>
                            <h2 className="text-xs -mt-0.5 text-muted-foreground">{data?.artists?.primary[0]?.name.slice(0, 20)}{data?.artists?.primary[0]?.name.length >= 20 ? ".." : ""}</h2>
                        </div>
                        <Button size="icon" className="min-w-10" onClick={togglePlayPause}>{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
                    </div>
                    <div className="w-full grid gap-1">
                        <Slider onValueChange={handleSeek} value={[currentTime]} max={duration} className="w-full" />
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
                            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </main>
    )
}