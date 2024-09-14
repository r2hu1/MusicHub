"use client"
import { MusicContext } from "@/hooks/use-context";
import { useEffect, useState } from "react";
import Player from "./cards/player";
import { useSearchParams } from "next/navigation";

export default function MusicProvider({ children }) {
    const [music, setMusic] = useState(null);
    const params = useSearchParams();

    useEffect(() => {
        if (localStorage.getItem("last-played")) {
            setMusic(localStorage.getItem("last-played"));
        }
    }, []);

    return (
        <MusicContext.Provider value={{ music, setMusic }}>
            {children}
            <Player />
        </MusicContext.Provider>
    )
}
