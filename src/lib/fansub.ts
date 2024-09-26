import assert from 'node:assert'
import { readdir } from 'node:fs/promises'
import { type IRepo, type IRepoFile } from './github'

export interface ISubtitlesDir {
  name: string
  path: string
  parent?: string
  subtitles: string[]
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
  /** Configuration for subtitle file handling */
  subtitle?: {
    /**
     * Array of regular expressions to identify subtitle files
     */
    patterns?: Array<RegExp>
  }
}

const defaultSubtitlePatterns = [/([^/]+\.(?:srt|ass))$/]

export function getSubtitleDirs(
  files: IRepoFile[],
  patterns: Array<RegExp> = defaultSubtitlePatterns,
): ISubtitlesDir[] {
  const subtitleDirs: Map<string, ISubtitlesDir> = new Map()

  for (const item of files) {
    // Find the first matching pattern regex
    const matchingPattern = patterns.find((regex) => regex.test(item.path))
    if (!matchingPattern) continue

    // Extract the subtitle path using the matching regex
    const match = matchingPattern.exec(item.path)
    if (!match || !match[1]) continue

    const subtitlePath = match[1]
    const fullPath = item.path

    // Calculate the parent directory path
    const parentPath = fullPath
      .slice(0, -subtitlePath.length)
      .replace(/\/$/, '')

    // Split the parent path into parts
    const parts = parentPath.split('/')

    // Get the immediate directory name and its parent
    const dirName = parts.pop() || ''
    const parent = parts.join('/')

    let sd = subtitleDirs.get(parentPath)
    if (!sd) {
      sd = {
        path: parentPath,
        name: dirName,
        parent: parent || undefined,
        subtitles: [],
      }
      subtitleDirs.set(parentPath, sd)
    }
    sd.subtitles.push(subtitlePath)
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
