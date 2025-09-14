"use client";
import { MusicContext } from "@/hooks/use-context";
import { useEffect, useState } from "react";

export default function MusicProvider({ children }) {
  const [music, setMusic] = useState(null);
  const [current, setCurrent] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("last-played")) {
      setMusic(localStorage.getItem("last-played"));
    }
  }, []);

  return (
    <MusicContext.Provider
      value={{
        music,
        setMusic,
        current,
        setCurrent,
        downloadProgress,
        setDownloadProgress,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
