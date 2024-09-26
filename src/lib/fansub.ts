import assert from 'node:assert'
import { readdir } from 'node:fs/promises'
import { type IRepo, type IRepoFile } from './github'

export interface ISubtitlesDir {
  name: string
  path: string
  parent?: string
}

export interface Fansub {
  /** Unique identifier for the fansub */
  slug: string
  /** Name of the fansub */
  name: string
  /** Current status of the fansub */
  status?: 'active' | 'inactive'
  /** Brief description of the fansub */
  description?: string
  /** URL of the fansub's avatar */
  avatar?: string
  /** Array of GitHub repositories associated with the fansub */
  repos: IRepo[]
  /** Various social media and contact links for the fansub */
  links: {
    /** Official website URL */
    website?: string
    /** Project management or tracking URL */
    project?: string
    /** Telegram group or channel URL */
    telegram?: string
    /** QQ group URL or identifier */
    qq?: string
    /** Bilibili profile URL */
    bilibili?: string
    /** Twitter profile URL */
    twitter?: string
    /** Weibo profile URL */
    weibo?: string
    /** Contact email address */
    email?: string
    /** Sponsorship or donation URL */
    sponsor?: string
  }
  /** Configuration for subtitle directory handling */
  subtitle?: {
    /**
     * Array of regular expressions to identify subtitle entry directories
     */
    entries: RegExp[]
  }
}

export function getSubtitleDirs(
  files: IRepoFile[],
  entries: RegExp[],
): ISubtitlesDir[] {
  const subtitleDirs: Map<string, ISubtitlesDir> = new Map()

  for (const item of files) {
    // Check if the file is in a subtitle entry directory
    const entryMatch = entries.some((re) => re.test(item.path))
    if (!entryMatch) continue

    const pathParts = item.path.split('/')
    const animeName = pathParts.pop() || ''
    const dirPath = pathParts.join('/')

    if (animeName) {
      let sd = subtitleDirs.get(dirPath + '/' + animeName)
      if (!sd) {
        sd = {
          path: dirPath + '/' + animeName,
          name: animeName,
          parent: dirPath,
        }
        subtitleDirs.set(dirPath + '/' + animeName, sd)
      }
    }
  }

  return Array.from(subtitleDirs.values()).sort((a, b) =>
    a.path.localeCompare(b.path),
  )
}

export async function importFansub(slug: string) {
  const mod = await import(`../fansubs/${slug}`)
  return mod.default as Fansub
}

const fansubFiles = await readdir('./src/fansubs')
export const fansubSlugs = fansubFiles.map((f) => f.replace(/\.ts$/, ''))
