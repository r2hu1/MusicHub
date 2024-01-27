import Link from "next/link";

export default function SongCard({ title, image, artist, id }) {
    return (
        <Link href={"/" + id} className="cursor-pointer" title={title}>
            <div className="rounded-md h-fit w-fit grid gap-2">
                <div>
                    <img className="transition hover:opacity-75 rounded-md max-w-[200px] w-[200px] h-[200px] bg-secondary aspect-square max-h-[200px] resize-none object-cover" src={image} />
                </div>
                <div className="grid place-content-center text-center">
                    <h1 className="text-sm text-ellipsis overflow-hidden max-w-[150px] font-bold">{title}</h1>
                    <p className="text-xs text-ellipsis overflow-hidden -mt-[2px] max-w-[100px] mx-auto">{artist}</p>
                </div>
            </div>
        </Link>
    )
}