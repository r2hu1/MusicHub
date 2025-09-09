"use client";

import { createContext, useContext, useState } from "react";
import { Progress } from "./ui/progress";
import { LucideDownload } from "lucide-react";

const ProgressContext = createContext(null);

export default function DownloadProgressProvider({ children }) {
  const [currState, setCurrState] = useState(0);
  const [title, setTitle] = useState("");
  return (
    <ProgressContext.Provider
      value={{ currState, setCurrState, title, setTitle }}
    >
      {title && (
        <div className="px-6 space-y-1 md:px-20 lg:px-32 py-4 bg-secondary/50">
          <h1 className="max-w-xs gap-0 text-sm text-secondary-foreground/80">
            Downloading{" "}
            <span className="truncate block text-secondary-foreground text-sm font-medium">
              {title}
            </span>
          </h1>

          <div className="w-full flex items-center gap-2">
            <Progress value={currState} className="h-1.5" />
            <span className="text-xs text-secondary-foreground/80">
              {currState}%
            </span>
          </div>
        </div>
      )}
      {children}
    </ProgressContext.Provider>
  );
}

export const useDownloadProgress = () => useContext(ProgressContext);
