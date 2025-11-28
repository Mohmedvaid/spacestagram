"use client";

import { PhotoItem } from "@/lib/api";
import { ImageCard } from "./ImageCard";
import { Loader2 } from "lucide-react";

/**
 * Props for the ImageGrid component
 */
interface ImageGridProps {
  /** Array of NASA photo items to display */
  photos: PhotoItem[];
  /** Whether images are currently loading */
  loading?: boolean;
  /** Optional callback when an image is clicked */
  onImageClick?: (item: PhotoItem) => void;
}

/**
 * ImageGrid component displays a responsive grid of NASA images
 * Shows loading state, empty state, or grid of ImageCard components
 * 
 * @param props - Component props
 * @returns Grid component with images or loading/empty states
 */
export function ImageGrid({ photos, loading, onImageClick }: ImageGridProps) {
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-500" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading images...</p>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-6xl">🔭</div>
        <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
          No images found
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {photos.map((item, index) => (
            <ImageCard
              key={item.href || index}
              item={item}
              onImageClick={onImageClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

