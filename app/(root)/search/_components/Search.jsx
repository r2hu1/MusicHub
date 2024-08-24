"use client";
import ArtistCard from "@/components/ArtistCard";
import SongCard from "@/components/SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { newSongs } from "@/lib/catchedSong";
import { getSongsByQuery } from "@/lib/fetch";
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
        setArtists(data.data.artists.results);
        setSongs(data.data.songs.results);
        setAlbums(data.data.albums.results)
        console.log(data.data.albums.results)
    }
    useEffect(() => {
        getSongs();
    }, params);

    return (
        <div className="py-12 -mt-9 px-6 md:px-20 md:w-fit md:mx-auto">
            <div className="grid gap-4">
                <div className="mt-2">
                    <h1 className="text-base font-medium">Search Results</h1>
                    <p className="text-xs text-muted-foreground">search results for "{decodeURI(query)}"</p>
                </div>
                <ScrollArea>
                    <div className="flex gap-6">
                        {songs.map((song) => (
                            <SongCard key={song.id} id={song.id} image={song.image[2].url} artist={song.singers || "unknown"} title={song.title} />
                        ))}
                    </div>
                    {!songs.length && (
                        <div className="flex gap-6">
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                        </div>
                    )}
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>

                <div className="mt-4">
                    <h1 className="font-medium text-base">Albums</h1>
                    <p className="text-xs text-muted-foreground">Albums related to "{decodeURI(query)}"</p>
                </div>
                <ScrollArea className="whitespace-nowrap pb-4">
                    <div className="flex gap-6">
                        {albums.map((song) => (
                            <SongCard key={song.title} desc={song.description} id={song.id} image={song.image[2].url} title={song.title} artist={song.artist} />
                        ))}
                    </div>
                    {!albums.length && (
                        <div className="flex gap-6">
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-[200px] w-[200px]" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20 -mt-1" />
                            </div>
                        </div>
                    )}
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>

                <div className="mt-1">
                    <h1 className="text-base font-medium">Related Artists</h1>
                    <p className="text-xs text-muted-foreground">artists related to "{decodeURI(query)}"</p>
                </div>
                <div className="flex gap-6 flex-wrap">
                    {artists.length > 0 ? (
                        <div className="flex gap-4 flex-wrap">
                            {artists.map((artist) => (
                                <ArtistCard key={artist.id} id={artist.id} image={artist.image[2].url} name={artist.title} />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div>
                                <Skeleton className="h-[100px] w-[100px]" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                            <div>
                                <Skeleton className="h-[100px] w-[100px]" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                            <div>
                                <Skeleton className="h-[100px] w-[100px]" />
                                <Skeleton className="h-3 mt-2 w-10" />
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}