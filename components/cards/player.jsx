"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  ExternalLink,
  Link2Icon,
  Pause,
  PauseCircle,
  Play,
  Repeat,
  Repeat1,
  X,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { getSongsById } from "@/lib/fetch";
import Link from "next/link";
import { MusicContext } from "@/hooks/use-context";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { IoPause } from "react-icons/io5";
import { useMusic } from "../music-provider";

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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
  };

  const { current, setCurrent } = useMusic();
  useEffect(() => {
    if (values.music) {
      getSong();
      if (current) {
        audioRef.current.currentTime = parseFloat(current + 1);
      }
      setPlaying(
        (localStorage.getItem("p") == "true" && true) ||
          (!localStorage.getItem("p") && true),
      );
      const handleTimeUpdate = () => {
        try {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration);
          setCurrent(audioRef.current.currentTime);
        } catch (e) {
          setPlaying(false);
        }
      };
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, [values.music]);
  return (
    <main>
      <audio
        autoPlay={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setDuration(audioRef.current.duration)}
        src={audioURL}
        ref={audioRef}
      ></audio>
      {values.music && (
        <div className="shadow-lg fixed grid bottom-0 max-w-[500px] md:border-l md:border-r md:rounded-md md:!rounded-b-none md:ml-auto right-0 left-0 border-border overflow-hidden border-t-none z-50 bg-background gap-3">
          <div className="w-full">
            {!duration ? (
              <Skeleton className="h-1 w-full" />
            ) : (
              <Slider
                thumbClassName="hidden"
                trackClassName="h-1 transition-[height] group-hover:h-2 rounded-none"
                onValueChange={handleSeek}
                value={[currentTime]}
                max={duration}
                className="w-full group"
              />
            )}
          </div>
          <div className="grid gap-2 p-3 pt-0">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex items-center gap-2 w-full">
                <img
                  src={data.image ? data?.image[1]?.url : ""}
                  alt={data?.name}
                  className="rounded-md aspect-square h-12 w-12 bg-secondary hover:opacity-85 transition cursor-pointer"
                />
                <img
                  src={data.image ? data?.image[1]?.url : ""}
                  alt={data?.name}
                  className="rounded-md h-[110%] min-w-[110%] opacity-40 hidden dark:block absolute top-0 left-0 right-0 blur-3xl -z-10"
                />
                <div>
                  {!data?.name ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    <Link
                      href={`/${values.music}`}
                      className="text-base flex hover:opacity-85 transition font-medium gap-2 items-center"
                    >
                      {/* Truncate needs a width to cut off text */}
                      <span className="truncate sm:max-w-[200px] max-w-[150px]">
                        {data?.name}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    </Link>
                  )}

                  {!data?.artists?.primary[0]?.name ? (
                    <Skeleton className="h-3 w-14 mt-1" />
                  ) : (
                    <h2 className="text-xs -mt-0.5 text-muted-foreground truncate max-w-[180px]">
                      {data?.artists?.primary[0]?.name}
                    </h2>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  className="p-0 h-9 w-9"
                  variant={!isLooping ? "ghost" : "secondary"}
                  onClick={loopSong}
                >
                  {!isLooping ? (
                    <Repeat className="h-3.5 w-3.5" />
                  ) : (
                    <Repeat1 className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button
                  size="icon"
                  className="p-0 h-9 w-9"
                  onClick={togglePlayPause}
                >
                  {playing ? (
                    <IoPause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  className="p-0 h-9 w-9"
                  variant="secondary"
                  onClick={() => {
                    values.setMusic(null);
                    setCurrent(0);
                    localStorage.clear();
                    audioRef.current.currentTime = 0;
                    audioRef.current.src = null;
                    setAudioURL(null);
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
