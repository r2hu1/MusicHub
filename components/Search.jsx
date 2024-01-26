"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function Search() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!query){
            router.push("/");
            return;
        };
        router.replace("/search/" + query);
        setQuery("");
    };
    return(
        <form onSubmit={handleSubmit}>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" className="w-full" type="search" name="query" placeholder="Search.."/>
        </form>
    )
}