import galleryData from "@/data/gallery.json";

export type GallerySize = "sm" | "md" | "lg";

export interface GalleryItem {
  id: number;
  type: "image" | "comparison";
  size: GallerySize;
  title: string;
  desc: string;
  url?: string;
  beforeUrl?: string;
  afterUrl?: string;
  objectPosition?: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

// Row spans for the desktop bento grid (auto-rows are 240px). Most tiles are 1 row;
// "lg" tiles are double-height for variety. Comparisons render 2 columns wide, 1 row tall.
export const ROW_SPAN: Record<GallerySize, number> = { sm: 1, md: 1, lg: 2 };
export const COMPARISON_ROW_SPAN = 1;

export const GALLERY_ITEMS = galleryData.items as GalleryItem[];
