import { Badge } from "../ui/badge";

export default function Next({ name, artist, image }) {
    return (
        <div className="mt-10 px-6 md:px-20 lg:px-32 -mb-2">
            <div className="border flex items-center gap-2 bg-secondary/30 p-2 rounded-md">
                <img src={image} className="h-16 w-16 rounded-md" />
                <div className="overflow-hidden flex-1"> {/* Flex-1 ensures the text container takes up remaining space */}
                    <h1 className="text-base text-ellipsis whitespace-nowrap overflow-hidden">
                        {name}
                    </h1>
                    <p className="-mt-0.5 mb-1 text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                        by{' '}
                        <span className="text-foreground">
                            {artist}
                        </span>
                    </p>
                    <Badge>playing next</Badge>
                </div>
            </div>
        </div>
    )
}