"use client"
import { MusicContext } from "@/hooks/use-context";
import { useEffect, useState } from "react";
import Player from "./cards/player";
import { useSearchParams } from "next/navigation";

export default function MusicProvider({ children }) {
    const [music, setMusic] = useState(null);

    useEffect(() => {
        if(localStorage.getItem("last-played")) {
            setMusic(localStorage.getItem("last-played"))
        }
        const params = useSearchParams().get("playing");
        setMusic(params ? params : null);
    }, []);
    return (
        <MusicContext.Provider value={{ music, setMusic }}>
            {children}
            <Player/>
        </MusicContext.Provider>
    )
}
