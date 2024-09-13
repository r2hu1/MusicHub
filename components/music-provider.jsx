"use client"
import { MusicContext } from "@/hooks/use-context";
import { useState } from "react";
import Player from "./cards/player";

export default function MusicProvider({ children }) {
    const [music, setMusic] = useState(null);
    return (
        <MusicContext.Provider value={{ music, setMusic }}>
            {children}
            <Player/>
        </MusicContext.Provider>
    )
}