"use client"
import { MusicContext } from "@/hooks/use-context";
import { useContext, useEffect, useState } from "react";
import Player from "./cards/player";

export default function MusicProvider({ children }) {
    const [music, setMusic] = useState(null);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("last-played")) {
            setMusic(localStorage.getItem("last-played"));
        }
    }, []);

    return (
        <MusicContext.Provider value={{ music, setMusic, current, setCurrent }}>
            {children}
        </MusicContext.Provider>
    )
}
export const useMusic = () => useContext(MusicContext);