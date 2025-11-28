import axios from "axios";
import {
  NASA_API_BASE_URL,
  QUERY_PARAMS,
  DEFAULT_QUERY,
  DEFAULT_PAGE,
} from "./constants";

export interface ApiParams {
  query: string;
  page?: number;
  startYear?: string;
  endYear?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

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

export interface ImageLink {
  href: string;
  rel: string;
  render: string;
  width?: number;
  height?: number;
  size?: number;
}

export function getImageUrl(item: PhotoItem, size: 'thumb' | 'small' | 'medium' | 'large' | 'orig' = 'medium'): string | null {
  if (!item.links || item.links.length === 0) return null;
  
  const link = item.links.find(l => l.href.includes(`~${size}.jpg`));
  return link?.href || item.links[0]?.href || null;
}

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

export interface PaginationLink {
  href: string;
  rel: string;
  prompt?: string;
}

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
 */
export const fetchNasaImages = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(url);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.reason ||
        error.message ||
        "Failed to fetch images",
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

