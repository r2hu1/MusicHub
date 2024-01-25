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
import { MenuIcon, Star } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";
import Logo from "./Logo";
import Search from "./Search";

export default function Header() {
    return (
        <header className="flex justify-between items-center py-6 md:px-20 px-6">
            <Logo />
            <div className="flex items-center justify-center gap-2">
                <div className="hidden md:block">
                    <Search />
                </div>
                <ModeToggle />
                <Button size="icon" asChild><Link href="https://github.com/r2hu1/musichub" target="_blank"><Star className="h-5 w-5"/></Link></Button>
            </div>
        </header>
    )
}