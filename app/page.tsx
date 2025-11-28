"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { Filters } from "@/components/Filters";
import { ContentHeader } from "@/components/ContentHeader";
import { ImageGrid } from "@/components/ImageGrid";
import { ImageModal } from "@/components/ImageModal";
import { LoadMore } from "@/components/LoadMore";
import {
  buildApiUrl,
  fetchNasaImages,
  extractPhotosAndPagination,
  PhotoItem,
} from "@/lib/api";
import { DEFAULT_QUERY } from "@/lib/constants";

/**
 * Main Home page component
 * Handles image search, filtering, sorting, and pagination
 * 
 * @returns Home page component
 */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_QUERY);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null);
  const [hasSearched, setHasSearched] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadImages = useCallback(
    async (query: string, yearStart?: string, yearEnd?: string, pageNum: number = 1) => {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setLoading(true);
      setError(null);

      try {
        const url = buildApiUrl({
          query,
          page: pageNum,
          startYear: yearStart,
          endYear: yearEnd,
        });

        const response = await fetchNasaImages(url, signal);

        // Check if request was aborted
        if (signal.aborted) return;

        if (response.success && response.data) {
          const { photos: fetchedPhotos, paginationLinks } = extractPhotosAndPagination(response.data);
          if (pageNum === 1) {
            setPhotos(fetchedPhotos);
          } else {
            setPhotos((prev) => [...prev, ...fetchedPhotos]);
          }
          // Check if there are more pages
          const hasNextPage = paginationLinks.some(link => link.rel === "next");
          setHasMore(hasNextPage && fetchedPhotos.length > 0);
        } else {
          setError(response.error || "Failed to fetch images");
          setPhotos([]);
          setHasMore(false);
        }
      } catch (err: unknown) {
        // Don't set error if request was aborted
        if (signal.aborted) return;

        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        setPhotos([]);
        setHasMore(false);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  // Sort photos based on sortBy value
  const sortedPhotos = useMemo(() => {
    if (photos.length === 0) {
      return [];
    }

    const sorted = [...photos].sort((a, b) => {
      const dateA = a.data[0]?.date_created || "";
      const dateB = b.data[0]?.date_created || "";

      if (sortBy === "latest") {
        // Latest: newest first (descending date)
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      } else {
        // Popular/Editor's Choice: keep original order
        return 0;
      }
    });

    return sorted;
  }, [photos, sortBy]);

  // Initial load on mount
  useEffect(() => {
    loadImages(DEFAULT_QUERY, undefined, undefined, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load images when search query or filters change (but not on initial mount)
  useEffect(() => {
    if (searchQuery && searchQuery !== DEFAULT_QUERY) {
      setHasSearched(true);
      loadImages(searchQuery, startYear || undefined, endYear || undefined, 1);
      setPage(1);
      
      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "start",
          });
        }
      }, 100);
    } else if (searchQuery === DEFAULT_QUERY && (startYear || endYear)) {
      // If filters change but query is still default, reload
      loadImages(searchQuery, startYear || undefined, endYear || undefined, 1);
      setPage(1);
    }
  }, [searchQuery, startYear, endYear, loadImages]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  };

  const handleResetFilters = () => {
    setStartYear("");
    setEndYear("");
  };

  const handleImageClick = (item: PhotoItem) => {
    setSelectedImage(item);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    
    try {
      const url = buildApiUrl({
        query: searchQuery,
        page: nextPage,
        startYear: startYear || undefined,
        endYear: endYear || undefined,
      });

      const response = await fetchNasaImages(url);

      if (response.success && response.data) {
        const { photos: fetchedPhotos, paginationLinks } = extractPhotosAndPagination(response.data);
        setPhotos((prev) => [...prev, ...fetchedPhotos]);
        setPage(nextPage);
        const hasNextPage = paginationLinks.some(link => link.rel === "next");
        setHasMore(hasNextPage && fetchedPhotos.length > 0);
      } else {
        setHasMore(false);
      }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load more images";
        setError(errorMessage);
        setHasMore(false);
      } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header onSearch={handleSearch} initialQuery={searchQuery} />

      <div id="banner">
        <Banner onSearch={handleSearch} />
      </div>

      <div id="results-section">
        {hasSearched && (
          <>
            <Filters
              startYear={startYear}
              endYear={endYear}
              onStartYearChange={setStartYear}
              onEndYearChange={setEndYear}
              onReset={handleResetFilters}
            />
            <ContentHeader
              totalImages={photos.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </>
        )}

        {error && (
          <div className="container mx-auto px-4 py-8">
            <div className="rounded-lg border border-red-500/50 bg-red-50 p-4 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {hasSearched && (
          <ImageGrid
            photos={sortedPhotos}
            loading={loading}
            onImageClick={handleImageClick}
          />
        )}
      </div>

      {hasSearched && !loading && photos.length > 0 && (
        <LoadMore
          onLoadMore={handleLoadMore}
          loading={loadingMore}
          hasMore={hasMore}
        />
      )}

      <ImageModal
        item={selectedImage}
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
      />
    </div>
  );
}
