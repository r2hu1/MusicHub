"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get("query");
        if(query){
            router.push(`/search?query=${query}`);
            e.target.reset();
        }
        else{
            router.push("/");
        }

    }
    return(
        <form onSubmit={handleSubmit}>
            <Input autoComplete="off" className="w-full" type="search" name="query" placeholder="Search.."/>
        </form>
    )
}