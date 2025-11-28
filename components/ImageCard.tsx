"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { PhotoItem, getImageUrl, getImageMetadata } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  item: PhotoItem;
  onImageClick?: (item: PhotoItem) => void;
}

export function ImageCard({ item, onImageClick }: ImageCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const metadata = getImageMetadata(item);
  const imageUrl = getImageUrl(item, "medium");
  const thumbUrl = getImageUrl(item, "thumb");

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (!imageUrl && !thumbUrl) {
    return null;
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-lg dark:bg-slate-800",
        !imageLoaded && "animate-pulse"
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        {!imageError && (imageUrl || thumbUrl) ? (
          <Image
            src={imageUrl || thumbUrl || ""}
            alt={metadata.title}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
            <span>Failed to load</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="line-clamp-2 text-sm font-medium text-white">
              {metadata.title}
            </h3>
          </div>
        </div>

        {/* Click overlay */}
        {onImageClick && (
          <button
            onClick={() => onImageClick(item)}
            className="absolute inset-0 z-10"
            aria-label={`View ${metadata.title}`}
          />
        )}

        {/* View button */}
        {imageUrl && (
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-2 top-2 z-20 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white"
            aria-label="Open full size"
          >
            <ExternalLink className="h-4 w-4 text-slate-900" />
          </a>
        )}
      </div>
    </div>
  );
}

