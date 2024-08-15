import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const DB_NAME = 'db'
export const DB_SUBS_STORE = 'subs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isSrtTime(str: string) {
  return /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/.test(str)
}
