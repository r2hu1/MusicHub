import Player from "../_components/Player";

export const metadata = {
    title: "Listing Now",
    description: "listing now on musichub!",
};

export default function Page({ params }) {
    return (
        <div className="py-20 -mb-5">
            <Player params={params} />
        </div>
    )
}