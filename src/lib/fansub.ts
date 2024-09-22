import assert from 'node:assert'
import { readdir } from 'node:fs/promises'
import { fetchRepoFiles, type IRepo, type IRepoFile } from './github'

export interface ISubtitlesDir {
  name: string
  path: string
  parent?: string
  subtitles: string[]
}

export interface FansubConfig {
  slug: string
  name: string
  status?: 'active' | 'inactive'
  description?: string
  avatar?: string
  repos: IRepo[]
  links: {
    website?: string
    project?: string
    telegram?: string
    qq?: string
    bilibili?: string
    twitter?: string
    weibo?: string
    email?: string
    sponsor?: string
  }
  subtitle?: {
    /**
     * @default ['.srt', '.ass']
     */
    exts?: Array<string | RegExp>
  }
}

export interface Fansub extends Omit<FansubConfig, 'subtitle'> {
  subtitleDirs: {
    [repo: string]: ISubtitlesDir[]
  }
}

export function defineConfig(config: FansubConfig): FansubConfig {
  return config
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

const fansubFiles = await readdir('./src/fansubs')
export const fansubSlugs = fansubFiles.map((f) => f.replace(/\.ts$/, ''))

export async function resolveConfig(config: FansubConfig): Promise<Fansub> {
  const subtitleDirs: Fansub['subtitleDirs'] = {}

  await Promise.all(
    config.repos.map(async (repo) => {
      const { files } = await fetchRepoFiles(repo)
      subtitleDirs[`${repo.owner}/${repo.name}`] = getSubtitleDirs(
        files,
        config.subtitle?.exts,
      )
    }),
  )

  return {
    ...config,
    subtitleDirs,
  }
}

export const fansubs: Fansub[] = await Promise.all(
  fansubSlugs.map(async (slug) => {
    const mod = await import(`../fansubs/${slug}`)
    return resolveConfig(mod.default)
  }),
)
