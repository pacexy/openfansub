import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { type IRepo, type IRepoFile } from './github'

export interface ISubtitlesDir {
  name: string
  path: string
  parent?: string
}

export interface ISubtitlesRepo extends IRepo {
  /**
   * Array of patterns to specify where subtitle directories are located.
   * Directories under an entry will be considered as subtitle directories.
   *
   * If not provided or empty, the root directory will be used.
   *
   * @default ['']
   */
  entries?: Array<string | RegExp>
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
  repos: ISubtitlesRepo[]
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
}

export function getSubtitleDirs(
  files: IRepoFile[],
  entries: ISubtitlesRepo['entries'] = [''],
): ISubtitlesDir[] {
  const subtitleDirs: Map<string, ISubtitlesDir> = new Map()

  for (const item of files) {
    const entry = entries.find((entry) =>
      typeof entry === 'string'
        ? item.path.startsWith(entry)
        : entry.test(item.path),
    )
    if (entry === undefined) continue

    const entryPath =
      typeof entry === 'string' ? entry : item.path.match(entry)![1]

    const restPath = item.path.slice(entryPath.length).replace(/^\//, '')
    const parts = restPath.split('/')

    // Skip if the path is not a directory
    if (parts.length === 1) continue

    const dirName = parts[0]
    const dirPath = join(entryPath, dirName)

    if (!subtitleDirs.has(dirPath)) {
      subtitleDirs.set(dirPath, {
        path: dirPath,
        name: dirName,
        parent: entryPath,
      })
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
