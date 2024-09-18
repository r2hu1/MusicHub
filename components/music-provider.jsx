"use client"
import { MusicContext } from "@/hooks/use-context";
import { useEffect, useState } from "react";
import Player from "./cards/player";

export default function MusicProvider({ children }) {
    const [music, setMusic] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("last-played")) {
            setMusic(localStorage.getItem("last-played"));
        }
    }, []);

    return (
        <MusicContext.Provider value={{ music, setMusic }}>
            {children}
        </MusicContext.Provider>
    )
}
