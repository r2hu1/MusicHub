import Link from "next/link";

export default function ArtistCard({ image, name, id }) {
    return (
        <Link href={"/search/" + `${encodeURI(name.toLowerCase().split(" ").join("+"))}`} className="border border-border rounded-md bg-secondary/30">
            <div className="p-2 overflow-hidden h-[100px] w-[100px]">
                <img src={image} alt={name} className="hover:scale-105 transition cursor-pointer rounded-md h-[100px] min-w-[100px] object-cover"/>
            </div>
            <div className="p-2 -mt-1">
                <h1 className="text-sm max-w-[100px] text-ellipsis text-nowrap overflow-hidden">{name.split(" ")[0] || null} {name.split(" ")[1] || null}</h1>
            </div>
        </Link>
    )
}
