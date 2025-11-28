"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, User, ExternalLink, Download } from "lucide-react";
import { PhotoItem, getImageUrl, getImageMetadata } from "@/lib/api";

interface ImageModalProps {
  item: PhotoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ item, isOpen, onClose }: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const metadata = getImageMetadata(item);
  const largeImageUrl = getImageUrl(item, "large") || getImageUrl(item, "medium");
  const originalImageUrl = getImageUrl(item, "orig");

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-lg bg-white dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 dark:bg-black/50"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        {largeImageUrl && (
          <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-700">
            <Image
              src={largeImageUrl}
              alt={metadata.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        )}

        {/* Details */}
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                {metadata.title}
              </h2>
              {metadata.description && (
                <p className="text-slate-600 dark:text-slate-300">{metadata.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              {originalImageUrl && (
                <a
                  href={originalImageUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              )}
              {largeImageUrl && (
                <a
                  href={largeImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Full Size
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 dark:border-slate-700 md:grid-cols-2">
            {metadata.dateCreated && (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Date Created</p>
                  <p className="text-slate-900 dark:text-white">{formatDate(metadata.dateCreated)}</p>
                </div>
              </div>
            )}
            {metadata.center && (
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Center</p>
                  <p className="text-slate-900 dark:text-white">{metadata.center}</p>
                </div>
              </div>
            )}
            {metadata.nasaId && (
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">NASA ID</p>
                <p className="text-slate-900 dark:text-white">{metadata.nasaId}</p>
              </div>
            )}
            {metadata.creator && (
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Creator</p>
                <p className="text-slate-900 dark:text-white">{metadata.creator}</p>
              </div>
            )}
          </div>

          {metadata.keywords && metadata.keywords.length > 0 && (
            <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
              <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">Keywords</p>
              <div className="flex flex-wrap gap-2">
                {metadata.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

