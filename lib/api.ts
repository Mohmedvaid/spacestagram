import axios from "axios";
import {
  NASA_API_BASE_URL,
  QUERY_PARAMS,
  DEFAULT_QUERY,
  DEFAULT_PAGE,
} from "./constants";

/**
 * Parameters for building NASA API URL
 */
export interface ApiParams {
  /** Search query string */
  query: string;
  /** Page number (default: 1) */
  page?: number;
  /** Start year filter (YYYY format) */
  startYear?: string;
  /** End year filter (YYYY format) */
  endYear?: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse {
  /** Whether the request was successful */
  success: boolean;
  /** Response data if successful */
  data?: any;
  /** Error message if failed */
  error?: string;
}

/**
 * NASA image item structure from API
 */
export interface PhotoItem {
  href: string;
  data: Array<{
    title?: string;
    description?: string;
    date_created?: string;
    nasa_id?: string;
    center?: string;
    keywords?: string[];
    secondary_creator?: string;
    [key: string]: any;
  }>;
  links?: Array<{
    href: string;
    rel?: string;
    render?: string;
    width?: number;
    height?: number;
    size?: number;
  }>;
}

/**
 * Image link structure from NASA API
 */
export interface ImageLink {
  href: string;
  rel: string;
  render: string;
  width?: number;
  height?: number;
  size?: number;
}

/**
 * Gets the image URL for a specific size from a PhotoItem
 * 
 * @param item - NASA photo item
 * @param size - Desired image size (default: 'medium')
 * @returns Image URL or null if not found
 */
export function getImageUrl(item: PhotoItem, size: 'thumb' | 'small' | 'medium' | 'large' | 'orig' = 'medium'): string | null {
  if (!item.links || item.links.length === 0) return null;
  
  const link = item.links.find(l => l.href.includes(`~${size}.jpg`));
  return link?.href || item.links[0]?.href || null;
}

/**
 * Extracts and normalizes metadata from a PhotoItem
 * 
 * @param item - NASA photo item
 * @returns Normalized metadata object with safe defaults
 */
export function getImageMetadata(item: PhotoItem) {
  const data = item.data[0];
  return {
    title: data?.title || 'Untitled',
    description: data?.description || '',
    dateCreated: data?.date_created || '',
    nasaId: data?.nasa_id || '',
    center: data?.center || '',
    keywords: data?.keywords || [],
    creator: data?.secondary_creator || '',
  };
}

/**
 * Pagination link from NASA API
 */
export interface PaginationLink {
  href: string;
  rel: string;
  prompt?: string;
}

/**
 * Extracted photos and pagination information
 */
export interface PhotosAndPagination {
  photos: PhotoItem[];
  paginationLinks: PaginationLink[];
}

/**
 * Build NASA API URL with query parameters
 */
export const buildApiUrl = ({
  query,
  page = DEFAULT_PAGE,
  startYear,
  endYear,
}: ApiParams): string => {
  const url = new URL(NASA_API_BASE_URL);
  url.searchParams.set("q", query);
  url.searchParams.set(QUERY_PARAMS.PAGE, page.toString());

  if (startYear) {
    url.searchParams.set(QUERY_PARAMS.START_YEAR, startYear);
  }
  if (endYear) {
    url.searchParams.set(QUERY_PARAMS.END_YEAR, endYear);
  }

  return url.toString();
};

/**
 * Fetch images from NASA API
 * 
 * @param url - NASA API URL
 * @param signal - Optional AbortSignal to cancel the request
 * @returns Promise with API response
 */
export const fetchNasaImages = async (
  url: string,
  signal?: AbortSignal
): Promise<ApiResponse> => {
  try {
    const response = await axios.get(url, { signal });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    // Handle abort errors
    if (axios.isCancel(error) || (error as Error)?.name === "AbortError") {
      return {
        success: false,
        error: "Request cancelled",
      };
    }

    // Handle axios errors
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error:
          error.response?.data?.reason ||
          error.message ||
          "Failed to fetch images",
      };
    }

    // Handle other errors
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch images",
    };
  }
};

/**
 * Extract photos and pagination from API response
 */
export const extractPhotosAndPagination = (
  responseData: any
): PhotosAndPagination => {
  const items = responseData?.collection?.items || [];
  const links = responseData?.collection?.links || [];

  return {
    photos: items,
    paginationLinks: links,
  };
};

/**
 * Get default query URL
 */
export const getDefaultQueryUrl = (): string =>
  buildApiUrl({ query: DEFAULT_QUERY, page: DEFAULT_PAGE });

