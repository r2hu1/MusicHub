import SongCard from "@/components/SongCard";

export default function Search(params) {
    const query = params.searchParams.query;
    return (
        <div className="py-20 -mt-10 px-6 md:px-20">
            {!query ? null : (
                <div className="mb-4">
                    <h1 className="text-lg">Search Results For <span className="text-primary">{query.toUpperCase()}</span></h1>
                </div>
            )}
        </div>
    )
}