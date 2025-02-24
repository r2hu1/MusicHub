"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

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
            <form onSubmit={handleSubmit} className="flex items-center relative z-10 w-full">
                <Button variant="ghost" type="submit" size="icon" className="absolute right-0 rounded-xl rounded-l-none bg-none"><SearchIcon className="w-4 h-4" /></Button>
                <Input ref={inpRef} value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" type="search" className="rounded-lg bg-secondary/50" name="query" placeholder="Try Maharani.." />
            </form>
        </>
    )
}