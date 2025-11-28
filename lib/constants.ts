/**
 * NASA API base URL for image search
 */
export const NASA_API_BASE_URL =
  "https://images-api.nasa.gov/search?media_type=image";

/**
 * Query parameter names for NASA API
 */
export const QUERY_PARAMS = {
  START_YEAR: "year_start",
  END_YEAR: "year_end",
  PAGE: "page",
} as const;

/**
 * Default search query
 */
export const DEFAULT_QUERY = "galaxy";

/**
 * Default page number for pagination
 */
export const DEFAULT_PAGE = 1;

/**
 * Local storage keys for persisting user data
 */
export const STORAGE_KEYS = {
  SAVED_PHOTOS: "savedPhotos",
  MASONRY_LAYOUT: "isMasonry",
} as const;

/**
 * Minimum year allowed for date filtering
 */
export const MIN_YEAR = 1900;

/**
 * Gets the maximum year allowed for date filtering (current year)
 * 
 * @returns Current year as a number
 */
export const getMaxYear = () => new Date().getFullYear();

/**
 * Application route paths
 */
export const ROUTES = {
  HOME: "/",
  FAVORITE: "/favorite",
} as const;

