import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}


export type ArchiveItem = {
  file_id: string;
  preview_file_id: string;
  artist: string;
  date: string;
  keywords: string[];
};

export type DisplayArchiveItem = ArchiveItem & {
  imageUrl: string;
};