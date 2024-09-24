import assert from 'node:assert'
import { readdir } from 'node:fs/promises'
import { fetchRepoFiles, type IRepo, type IRepoFile } from './github'

export interface ISubtitlesDir {
  name: string
  path: string
  parent?: string
  subtitles: string[]
}

export interface FansubDefinition {
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
     * Array of file extensions or regular expressions to identify subtitle files
     * @default ['.srt', '.ass']
     */
    exts?: Array<string | RegExp>
  }
}

export interface Fansub extends Omit<FansubDefinition, 'subtitle'> {
  subtitleDirs: {
    [repo: string]: ISubtitlesDir[]
  }
}

const defaultSubtitleExts = ['.srt', '.ass']

export function getSubtitleDirs(
  files: IRepoFile[],
  exts: Array<string | RegExp> = defaultSubtitleExts,
): ISubtitlesDir[] {
  const subtitleDirs: Map<string, ISubtitlesDir> = new Map()

  for (const item of files) {
    if (
      !exts.some((e) =>
        typeof e === 'string' ? item.path.endsWith(e) : e.test(item.path),
      )
    ) {
      continue
    }

    const parts = item.path.split('/')
    const fileName = parts.pop()
    const path = parts.join('/')

    const dirName = parts.pop()
    const parent = parts.join('/')

    assert(fileName, 'fileName should not be empty')
    assert(dirName, 'dirName should not be empty')

    let sd = subtitleDirs.get(path)
    if (!sd) {
      sd = {
        path,
        name: dirName,
        parent,
        subtitles: [],
      }
      subtitleDirs.set(path, sd)
    }
    sd.subtitles.push(fileName)
  }

  return Array.from(subtitleDirs.values()).sort((a, b) =>
    a.path.localeCompare(b.path),
  )
}

async function resolveFansub(fansub: FansubDefinition): Promise<Fansub> {
  const subtitleDirs: Fansub['subtitleDirs'] = {}

  await Promise.all(
    fansub.repos.map(async (repo) => {
      const { files } = await fetchRepoFiles(repo)
      subtitleDirs[`${repo.owner}/${repo.name}`] = getSubtitleDirs(
        files,
        fansub.subtitle?.exts,
      )
    }),
  )

  // [RegExp] is not supported to pass to client client.
  // Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
  delete fansub.subtitle

  return {
    ...fansub,
    subtitleDirs,
  }
}

async function importFansub(slug: string) {
  const mod = await import(`../fansubs/${slug}`)
  return mod.default as FansubDefinition
}

export async function fetchFansub(slug: string) {
  return resolveFansub(await importFansub(slug))
}

const fansubFiles = await readdir('./src/fansubs')
export const fansubSlugs = fansubFiles.map((f) => f.replace(/\.ts$/, ''))
export const fansubDefs = await Promise.all(fansubSlugs.map(importFansub))
