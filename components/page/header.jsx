"use client"
import { ModeToggle } from "../ModeToggle";
import Logo from "./logo";
import { Button } from "../ui/button";
import Search from "./search";
import { ChevronDown, ChevronLeft, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
    const path = usePathname();
    console.log(path);
    return (
        <header className="grid gap-3 pt-5 px-5 pb-5 md:px-20 lg:px-32">
            <div className="flex items-center justify-between">
                {path == "/" ? (
                    <Button size="icon" onClick={() => { navigator.share({ url: window.location.href }) }} variant="outline" className="rounded-full lg:-ml-4"><Share2 className="w-4 h-4" /></Button>
                ) : (
                    <Button size="icon" asChild variant="outline" className="rounded-full"><Link href="/"><ChevronLeft className="w-5 h-5" /></Link></Button>
                )}
                <Logo />
                <ModeToggle />
            </div>
            <Search />
        </header>
    )
}
