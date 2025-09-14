"use client"
import { NextContext } from "@/hooks/use-context";
import { useState } from "react";

export default function NextProvider({ children }) {
    const [nextData, setNextData] = useState(null);

    return (
        <NextContext.Provider value={{ nextData, setNextData }}>
            {children}
        </NextContext.Provider>
    )
}
