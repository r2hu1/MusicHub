"use client"
import { MusicContext } from "@/hooks/use-context";
import { useState } from "react";
import Player from "./cards/player";
import { useSearchParams } from "next/navigation";

export default function MusicProvider({ children }) {
    const params = useSearchParams().get("playing");
    const [music, setMusic] = useState(params ? params : null);

    return (
        <MusicContext.Provider value={{ music, setMusic }}>
            {children}
            <Player/>
        </MusicContext.Provider>
    )
}