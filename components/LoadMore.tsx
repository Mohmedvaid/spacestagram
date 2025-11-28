"use client";

import { Loader2 } from "lucide-react";

interface LoadMoreProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

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

