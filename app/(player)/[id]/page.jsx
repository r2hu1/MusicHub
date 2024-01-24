"use client"

import { getSongsById } from "@/lib/fetch";
import { useEffect, useState } from "react"

export default function Page({ params }) {
    const [data, setData] = useState([]);
    const getSong = async () => {
        const get = await getSongsById(params.id);
        const data = await get.json();
        setData(data);
        console.log(data);
    }
    useEffect(() => {
        getSong();
    },[]);
    return (
        <div>
            <h1>Song Page</h1>
        </div>
    )
}