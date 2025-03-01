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
    return (
        <header className="grid gap-2 pt-5 px-5 pb-5 md:px-20 lg:px-32">
            <div className="flex items-center sm:justify-between w-full gap-2">
                {path == "/" ? (
                    <div className="flex items-center gap-1">
                        <Logo />
                        <ModeToggle />
                    </div>
                ) : (
                    <div className="flex justify-between w-full items-center gap-1">
                        <Logo />
                        <Button className="rounded-full sm:hidden h-8 px-3" asChild><Link href="/" className="flex items-center gap-1"><ChevronLeft className="w-4 h-4" />Back</Link></Button>
                    </div>
                )}
                <div className="hidden sm:flex items-center gap-3 w-full max-w-md">
                    <Search />
                    {path != "/" && (
                        <Button className="h-10 px-3" asChild><Link href="/" className="flex items-center gap-1"><ChevronLeft className="w-4 h-4" />Back</Link></Button>
                    )}
                </div>
            </div>
        </header>
    )
}
