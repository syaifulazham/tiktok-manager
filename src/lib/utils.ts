import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TikTokConsultFormData = {
  productCategory: string;
  productName: string;
  productDescription: string;
  expression: string;
  language: string;
}

export type TikTokConsultResult = {
  videoStoryline: string;
  dialogueParts: string;
  captions: string;
  soundType: string;
  uploadTime: string;
  dosDonts: {
    dos: string[];
    donts: string[];
  }
}