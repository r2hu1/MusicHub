"use client";
import ArtistCard from "@/components/cards/artist";
import SongCard from "@/components/cards/song";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { newSongs } from "@/lib/catchedSong";
import { getAlbumById, getSongsByQuery, searchAlbumByQuery } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function Search({ params }) {
    const rap = newSongs;
    const query = params.id;

    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);

    const getSongs = async () => {
        const get = await getSongsByQuery(query);
        const data = await get.json();
        setSongs(data.data.results);
        setArtists(data.data.results)
    };
    const getAlbum = async () => {
        const get = await searchAlbumByQuery(query);
        const data = await get.json();
        setAlbums(data.data.results);
    };
    useEffect(() => {
        getSongs();
        getAlbum();
    }, [params.id]);

    return (
        <div className="py-12 -mt-9 px-6 md:px-20 lg:px-32">
            <div className="grid gap-4">
                <div className="mt-2">
                    <h1 className="text-base font-medium">Search Results</h1>
                    <p className="text-xs text-muted-foreground">search results for "{decodeURI(query)}"</p>
                </div>
                <ScrollArea>
                    <div className="flex gap-3">
                        {songs.length ? songs.map((song) => (
                            <SongCard key={song.id} id={song.id} image={song.image[2].url} artist={song.artists.primary[0].name || "unknown"} title={song.name} />
                        )) : (
                            <>
                                <SongCard />
                                <SongCard />
                                <SongCard />
                                <SongCard />
                                <SongCard />
                            </>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>

                <div className="mt-4">
                    <h1 className="font-medium text-base">Albums</h1>
                    <p className="text-xs text-muted-foreground">Albums related to "{decodeURI(query)}"</p>
                </div>
                <ScrollArea className="whitespace-nowrap pb-4">
                    <div className="flex gap-3">
                        {albums.length ? albums.map((song) => (
                            <SongCard key={song.id} desc={song.description || null} id={`album/${song.id}`} image={song.image[2].url} title={song.name} artist={song.artists.primary[0].name} />
                        )) : (
                            <>
                                <SongCard />
                                <SongCard />
                                <SongCard />
                                <SongCard />
                                <SongCard />
                            </>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>

                <div className="mt-1">
                    <h1 className="text-base font-medium">Related Artists</h1>
                    <p className="text-xs text-muted-foreground">artists related to "{decodeURI(query)}"</p>
                </div>
                <ScrollArea>
                    {artists.length > 0 ? (
                        <div className="flex gap-3">
                            {[...new Set(artists.map(a => a.artists.primary[0].id))].map(id => (
                                <ArtistCard key={id} id={id} image={artists.find(a => a.artists.primary[0].id === id).artists.primary[0].image[2]?.url || "https://github.githubassets.com/assets/mona-loading-dark-7701a7b97370.gif"} name={artists.find(a => a.artists.primary[0].id === id).artists.primary[0].name} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <div>
                                <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                            <div>
                                <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                            <div>
                                <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                            <div>
                                <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                            <div>
                                <Skeleton className="h-[100px] w-[100px] rounded-2xl" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                        </div>
                    )}
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
        </div>
    )
}