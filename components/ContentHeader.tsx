"use client";

import { useMemo } from "react";

/**
 * Props for the ContentHeader component
 */
interface ContentHeaderProps {
  /** Total number of images displayed */
  totalImages: number;
  /** Current sort option */
  sortBy: string;
  /** Callback when sort option changes */
  onSortChange: (sort: string) => void;
}

/**
 * ContentHeader component displays image count and sorting options
 * 
 * @param props - Component props
 * @returns Header component with count and sort buttons
 */
export function ContentHeader({ totalImages, sortBy, onSortChange }: ContentHeaderProps) {
  const sortOptions = useMemo(
    () => [
      { value: "latest", label: "Latest" },
      { value: "popular", label: "Editor's Choice" },
    ],
    []
  );

  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-slate-600 dark:text-slate-400">
            Over{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {totalImages.toLocaleString()}+
            </span>{" "}
            high quality space images shared by NASA
          </p>
          <div className="flex items-center gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === option.value
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

