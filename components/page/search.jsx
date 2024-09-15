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
            <form onSubmit={handleSubmit} className="flex items-center">
                <Input ref={inpRef} value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" className="w-full !outline-none !ring-0 md:w-[300px] border-r-0 rounded-r-none" type="search" name="query" placeholder="Type something to search..." />
                <Button type="submit" size="icon" className="min-w-10 rounded-l-none"><SearchIcon className="w-4 h-4"/></Button>
            </form>
        </>
    )
}