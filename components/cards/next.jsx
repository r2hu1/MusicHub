import Link from "next/link";
import { Badge } from "../ui/badge";
import { Play } from "lucide-react";

export default function Next({ name, artist, image, id, next = true }) {
  return (
    <Link href={`/${id}`}>
      <div className="flex items-center gap-3 bg-secondary/30 border p-2 rounded-md">
        <img src={image} className="aspect-square w-10 rounded-md" />
        <div className="overflow-hidden flex-1">
          <h1 className="text-secondary-foreground text-base text-ellipsis whitespace-nowrap overflow-hidden sm:max-w-md max-w-[150px]">
            {name}
          </h1>
          <p className="-mt-0.5 mb-1 text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
            by <span className="text-secondary-foreground">{artist}</span>
          </p>
        </div>
        {next && <Badge className="!font-normal">next</Badge>}
        {!next && (
          <Badge>
            <Play size={16} className="w-3 px-0 h-4" />
          </Badge>
        )}
      </div>
    </Link>
  );
}
