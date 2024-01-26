import { getSongsById } from "@/lib/fetch";
import Player from "../_components/Player";

export const generateMetadata = async ({ params }) => {
    const title = await getSongsById(params.id);
    const data = await title.json();
    return {
        title: `${data.song}`
    }
}

export default function Page({ params }) {
    return (
        <div className="py-20 -mb-5">
            <Player params={params} />
        </div>
    )
}