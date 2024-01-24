import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="select-none">
            <div>
                <h1 className="text-3xl font-bold">Music<span className="text-primary">hub</span></h1>
            </div>
        </Link>
    )
}