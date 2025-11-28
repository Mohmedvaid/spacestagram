// NASA API Configuration
export const NASA_API_BASE_URL =
  "https://images-api.nasa.gov/search?media_type=image";

// Query Parameters
export const QUERY_PARAMS = {
  START_YEAR: "year_start",
  END_YEAR: "year_end",
  PAGE: "page",
} as const;

// Default Values
export const DEFAULT_QUERY = "galaxy";
export const DEFAULT_PAGE = 1;

// Local Storage Keys
export const STORAGE_KEYS = {
  SAVED_PHOTOS: "savedPhotos",
  MASONRY_LAYOUT: "isMasonry",
} as const;

// Year Validation
export const MIN_YEAR = 1900;
export const getMaxYear = () => new Date().getFullYear();

// Routes
export const ROUTES = {
  HOME: "/",
  FAVORITE: "/favorite",
} as const;

