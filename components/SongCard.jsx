import Link from "next/link";

export default function SongCard({ title, image, artist, id, desc }) {
    return (
        <div className="p-2 h-fit border border-border rounded-md bg-secondary/30 w-[200px]">
            <div className="overflow-hidden rounded-md">
                <Link href={`/${id}`}>
                    <img src={image} alt={title} className="rounded-md transition hover:scale-105 cursor-pointer" />
                </Link>
            </div>
            <div className="cursor-pointer">
                <Link href={`/${id}`} className="mt-2 flex items-center justify-between">
                    <h1 className="text-sm font-medium hover:opacity-70">{title.slice(0, 25)}{title.length > 25 && '...'}</h1>
                </Link>
                {desc && (
                    <p className="text-xs text-muted-foreground">{desc.slice(0,30)}</p>
                )}
                <p className="text-xs text-muted-foreground">by <span className="text-primary">{artist.slice(0, 20)}{artist.length > 20 && '...'}</span></p>
            </div>
        </div>
    )
}