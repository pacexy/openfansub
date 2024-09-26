import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { type IRepo, type IRepoFile } from './github'

export interface IAnimeDir {
  name: string
  path: string
  parent?: string
}

export interface ISubtitlesRepo extends IRepo {
  /**
   * Array of patterns to specify where anime directories are located.
   * Directories under an entry will be considered as anime directories.
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

export function getAnimeDirs(
  files: IRepoFile[],
  entries: ISubtitlesRepo['entries'] = [''],
): IAnimeDir[] {
  const animeDirs: IAnimeDir[] = []

  for (const f of files) {
    const last = animeDirs[animeDirs.length - 1]

    // Skip if the anime dir is already in the list
    if (last && f.path.startsWith(last.path)) continue

    const entry = entries.find((e) =>
      typeof e === 'string' ? f.path.startsWith(e) : e.test(f.path),
    )

    // Skip if the file is not in any entry
    if (entry === undefined) continue

    const entryPath =
      typeof entry === 'string' ? entry : f.path.match(entry)![1]
    const restPath = f.path.slice(entryPath.length).replace(/^\//, '')
    const parts = restPath.split('/')

    // Skip if the file is not a directory
    if (parts.length === 1) continue

    const dirName = parts[0]
    const dirPath = path.posix.join(entryPath, dirName)

    animeDirs.push({
      path: dirPath,
      name: dirName,
      parent: entryPath,
    })
  }

  return animeDirs
}

export async function importFansub(slug: string) {
  const mod = await import(`../fansubs/${slug}`)
  return mod.default as Fansub
}

const fansubFiles = await readdir('./src/fansubs')
export const fansubSlugs = fansubFiles.map((f) => f.replace(/\.ts$/, ''))
