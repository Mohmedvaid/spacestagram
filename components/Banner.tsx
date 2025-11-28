"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface BannerProps {
  onSearch: (query: string) => void;
}

export function Banner({ onSearch }: BannerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const popularSearches = [
    "galaxy",
    "nebula",
    "mars",
    "saturn",
    "black hole",
    "earth",
    "jupiter",
    "moon",
    "stars",
    "astronaut",
    "space",
    "cosmos",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="relative overflow-hidden" style={{ minHeight: "180px" }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images-assets.nasa.gov/image/PIA04921/PIA04921~large.jpg)",
            filter: "blur(2px)",
            transform: "scale(1.1)",
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"
            style={{ opacity: 0.9 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <div className="container mx-auto px-4" style={{ paddingTop: "1rem", paddingBottom: "0" }}>
          {/* Centered Content */}
          <div className="flex flex-1 items-center" style={{ minHeight: "auto" }}>
            <div
              className="container mx-auto px-4"
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
            >
              <div className="mx-auto max-w-4xl text-center">
                {/* Search Bar */}
                <form onSubmit={handleSubmit} style={{ marginBottom: "0.5rem" }}>
                  <div className="relative mx-auto" style={{ maxWidth: "600px" }}>
                    <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="search for free images"
                      className="w-full rounded-lg border-0 bg-white pl-14 pr-4 text-slate-900 shadow-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-purple-500/50"
                      style={{
                        paddingTop: "0.75rem",
                        paddingBottom: "0.75rem",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                </form>

                {/* Popular Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => onSearch(term)}
                      className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
