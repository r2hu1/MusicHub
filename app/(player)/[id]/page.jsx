import { getSongsById } from "@/lib/fetch";
import Player from "../_components/Player";
import Recomandation from "../_components/Recomandation";
import AdvanceSearch from "../_components/AdvanceSearch";

export const generateMetadata = async ({ params }) => {
    const title = await getSongsById(params.id);
    const data = await title.json();
    return {
        title: `Now Playing - ${data.song}`
    }
}

export default function Page({ params }) {
    return (
        <div>
            <AdvanceSearch/>
            <Player id={params.id} />
            <Recomandation id={params.id} />
        </div>
    )
}