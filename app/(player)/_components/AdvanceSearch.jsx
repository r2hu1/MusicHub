"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { getSongsByQuery } from "@/lib/fetch";
import { Loader } from "lucide-react";

export default function AdvanceSearch() {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSongs = async () => {
        if (query.trim() === "") {
            setData([]);
            return;
        }
        
        setLoading(true);
        try {
            const response = await getSongsByQuery(query);
            const result = await response.json();
            
            // Debugging logs
            console.log("API response:", result);
            
            // Check if the expected data structure exists
            if (result.data && result.data.results) {
                setData(result.data.results);
            } else {
                console.warn("Unexpected data structure:", result);
                setData([]);
            }
        } catch (error) {
            console.error("Failed to fetch songs", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            const handler = setTimeout(() => {
                getSongs();
            }, 100); // Debounce to avoid too many requests

            return () => {
                clearTimeout(handler);
            };
        } else {
            setData([]);
        }
    }, [query]);

    return (
        <div className="px-6 !mb-10">
            <Input
                placeholder="Search for song, artist..."
                readOnly
                onClick={() => setOpen(true)}
            />
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Search for song, artist..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    <CommandGroup>
                        {query != "" && (
                            <>
                                <Link href={`/search/${query}`} passHref>
                                    <CommandItem>
                                        Search for{" "}
                                        <span className="font-bold bg-primary text-primary-foreground ml-1.5">
                                            {query}
                                        </span>
                                    </CommandItem>
                                </Link>
                                {loading ? (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader className="w-6 h-6 animate-spin" />
                                    </div>
                                ) : data.length > 0 ? (
                                    data.map((song) => (
                                        <Link href={`/${song.id}`} key={song.id} passHref>
                                            <CommandItem className="gap-2">
                                                <img
                                                    src={song.image[2]?.url || '/placeholder-image.png'}
                                                    alt={song.name}
                                                    className="w-8 h-8 rounded-md"
                                                />
                                                <p className="grid">
                                                    {song.name}
                                                    <span className="text-xs text-muted-foreground">
                                                        by{" "}
                                                        <span className="text-foreground/70">
                                                            {song.artists?.primary[0]?.name || "unknown"}
                                                        </span>
                                                    </span>
                                                </p>
                                            </CommandItem>
                                        </Link>
                                    ))
                                ) : (
                                    <CommandEmpty>No results found.</CommandEmpty>
                                )}
                            </>
                        )}
                    </CommandGroup>
                    {!query && (
                        <div className="text-sm text-muted-foreground h-32 -mt-2 text-center flex items-center justify-center">
                            Type something to search.
                        </div>
                    )}
                </CommandList>
            </CommandDialog>
        </div>
    );
}
