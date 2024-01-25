import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
    return(
        <form action="/search?query=">
            <Input autoComplete="off" className="w-full" type="search" name="query" placeholder="Search.."/>
        </form>
    )
}