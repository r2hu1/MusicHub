import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";
import Logo from "./Logo";

export default function Header() {
    return (
        <header className="flex justify-between items-center py-6 md:px-20 px-6">
            <Logo/>
            <div className="flex items-center justify-center gap-2">
            <form action="/search" className="hidden md:block">
                <Input autoComplete="off" className="w-full min-w-[300px]" type="search" name="query" placeholder="Search.." />
            </form>
                <ModeToggle />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon"><MenuIcon className="h-5 w-5" /></Button>
                    </SheetTrigger>
                    <SheetContent className="grid place-items-center">
                        <SheetHeader>
                            <SheetDescription>
                                <ul className="flex flex-col gap-2 w-full">
                                    <li className="h-12 w-full flex items-center justify-center text-base hover:text-primary cursor-pointer transition text-secondary-foreground"><Link href="/">Home</Link></li>
                                    <li className="h-12 w-full flex items-center justify-center text-base hover:text-primary cursor-pointer transition text-secondary-foreground"><Link href="/">Trending</Link></li>
                                    <li className="h-12 w-full flex items-center justify-center text-base hover:text-primary cursor-pointer transition text-secondary-foreground"><Link href="/">New Releases</Link></li>
                                    <li className="h-12 w-full flex items-center justify-center text-base hover:text-primary cursor-pointer transition text-secondary-foreground"><Link href="/">Artists</Link></li>
                                </ul>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}