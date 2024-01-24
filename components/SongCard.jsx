import Link from "next/link";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

export default function SongCard({ title, image, artist, id }) {
    return (
        <Link href={id} className="cursor-pointer">
            <div className="hover:bg-secondary border p-3 rounded-md h-fit w-fit grid gap-3">
                <div>
                    <img className="rounded-md aspect-video max-w-[200px] md:aspect-square h-full md:max-h-[200px] resize-none object-cover" src={image} />
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-base text-ellipsis overflow-hidden max-w-[150px]">{title}</h1>
                    {/* <Badge className="text-xs">{artist}</Badge> */}
                </div>
            </div>
        </Link>
    )
}