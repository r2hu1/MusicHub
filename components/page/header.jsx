import { Bookmark, Star } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import Search from "./search";
import { buttonVariants } from "../ui/button";

export default function Header() {
    return (
        <header className="flex justify-between items-center py-5 md:px-20 lg:px-32 px-6">
            <Logo />
            <div className="flex items-center justify-center gap-2">
                <div className="hidden md:block">
                    <Search />
                </div>
                {/* <Link href="/saved" className={cn(buttonVariants({ variant: "default" }), "gap-2")}>
                    Saved <Bookmark className="w-4 h-4" />
                </Link> */}
                <ModeToggle />
            </div>
        </header>
    )
}
