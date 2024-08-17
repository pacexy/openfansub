import assert from 'node:assert'
import { readdir } from 'node:fs/promises'
import { fetchRepoFiles, type IRepoFile } from './github'

export interface ISubtitlesDir {
  path: string
  subtitles: string[]
}

export interface FansubConfig {
  slug: string
  name: string
  description?: string
  avatar?: string
  repo: {
    owner: string
    name: string
    branch: string
  }
  links: {
    website?: string
    project?: string
    telegram?: string
    qq?: string
    bilibili?: string
  }
  subtitleDirs?: ISubtitlesDir[]
}

// TODO: impl defineConfig

const supportedSubtitleExts = ['.srt', '.ass']

export function getSubtitleDirs(files: IRepoFile[]): ISubtitlesDir[] {
  const subtitleDirs: Map<string, ISubtitlesDir> = new Map()

  for (const item of files) {
    if (!supportedSubtitleExts.some((ext) => item.path.endsWith(ext))) continue

    const parts = item.path.split('/')
    const fileName = parts.pop()
    const path = parts.join('/')

    assert(fileName, 'fileName should not be empty')

    let sd = subtitleDirs.get(path)
    if (!sd) {
      sd = {
        path,
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
export const fansubs = fansubFiles.map((file) => file.replace(/\.ts$/, ''))

export const fansubConfigs: FansubConfig[] = await Promise.all(
  fansubs.map(async (fansub) => {
    const config: FansubConfig = (await import(`../fansubs/${fansub}`)).default
    const { files } = await fetchRepoFiles(config.repo)
    config.subtitleDirs = getSubtitleDirs(files)
    return config
  }),
)
