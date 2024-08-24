"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Input } from "../ui/input";

export default function Search() {
    const [query, setQuery] = useState("");
    const linkRef = useRef();
    const inpRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query) {
            router.push("/");
            return;
        };
        linkRef.current.click();
        inpRef.current.blur();
        setQuery("");
    };
    return (
        <>
        <Link href={"/search/" + query} ref={linkRef}></Link>
            <form onSubmit={handleSubmit}>
                <Input ref={inpRef} value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" className="w-full md:w-[300px]" type="search" name="query" placeholder="Search for song, artist.." />
            </form>
        </>
    )
}