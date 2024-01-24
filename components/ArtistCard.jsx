export default function ArtistCard({ image, name }) {
    return (
        <div className="transition hover:bg-primary cursor-pointer hover:text-white bg-secondary py-3 rounded-md px-5 w-full flex flex-wrap items-center justify-center gap-4" title={name}>
            <h1 className="text-sm">{name}</h1>
        </div>
    )
}