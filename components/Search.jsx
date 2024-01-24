import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
    return(
        <form action="/search" className="md:hidden flex items-center justify-center gap-2 px-6">
            <Input autoComplete="off" className="w-full" type="search" name="query" placeholder="Search.."/>
            {/* <Button type="submit">Search</Button> */}
        </form>
    )
}