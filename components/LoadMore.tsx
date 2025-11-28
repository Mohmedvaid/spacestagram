"use client";

import { Loader2 } from "lucide-react";

/**
 * Props for the LoadMore component
 */
interface LoadMoreProps {
  /** Callback function to load more images */
  onLoadMore: () => void;
  /** Whether more images are currently loading */
  loading: boolean;
  /** Whether there are more images available to load */
  hasMore: boolean;
}

/**
 * LoadMore component displays a button to load additional images
 * Shows "No more images" message when all images are loaded
 * 
 * @param props - Component props
 * @returns Load more button or end message
 */
export function LoadMore({ onLoadMore, loading, hasMore }: LoadMoreProps) {
  if (!hasMore) {
    return (
      <div className="py-8 text-center text-slate-600 dark:text-slate-400">
        <p>No more images to load</p>
      </div>
    );
  }

  return (
    <div className="py-8 text-center">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Load More"
        )}
      </button>
    </div>
  );
}

