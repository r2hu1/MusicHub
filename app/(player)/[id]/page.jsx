import { getSongsById } from "@/lib/fetch";
import Player from "../_components/Player";
import Recomandation from "../_components/Recomandation";
import AdvanceSearch from "../_components/AdvanceSearch";
import Search from "@/components/page/search";

export const generateMetadata = async ({ params }) => {
    const title = await getSongsById(params.id);
    const data = await title.json();
    return {
        title: `${data.data[0].name}`
    }
}

export default function Page({ params }) {
    return (
        <div>
            <div className="px-6 md:hidden">
                <Search />
            </div>
            {/* <AdvanceSearch/> */}
            <Player id={params.id} />
            <Recomandation id={params.id} />
        </div>
    )
}