import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function keys<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}

export function fuzzyMatch(text: string, keyword: string) {
  const reg = new RegExp(keyword, 'i')
  return reg.test(text)
}
