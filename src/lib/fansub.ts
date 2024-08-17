import assert from 'node:assert'
import { readdir } from 'node:fs/promises'
import { fetchRepoFiles } from './github'

export interface IAnime {
  path: string
  subtitles: string[]
}

export interface FansubConfig {
  slug: string
  name: string
  description?: string
  logo: string
  links: {
    repository: string
    website?: string
    telegram?: string
    qq?: string
    bilibili?: string
  }
  animes?: IAnime[]
}

// TODO: impl defineConfig

const supportedSubtitleExts = ['.srt', '.ass']

export async function fetchAnimeFiles(repoUrl: string): Promise<IAnime[]> {
  const animes: Map<string, IAnime> = new Map()
  const { files } = await fetchRepoFiles(repoUrl)

  for (const item of files) {
    if (!supportedSubtitleExts.some((ext) => item.path.endsWith(ext))) continue

    const parts = item.path.split('/')
    const fileName = parts.pop()
    const path = parts.join('/')

    assert(fileName, 'fileName should not be empty')

    let anime = animes.get(path)
    if (!anime) {
      anime = {
        path,
        subtitles: [],
      }
      animes.set(path, anime)
    }
    anime.subtitles.push(fileName)
  }

  return Array.from(animes.values())
}

const fansubFiles = await readdir('./src/fansubs')
export const fansubs = fansubFiles.map((file) => file.replace(/\.ts$/, ''))

export const fansubConfigs: FansubConfig[] = await Promise.all(
  fansubs.map(async (fansub) => {
    const config: FansubConfig = (await import(`../fansubs/${fansub}`)).default
    config.animes = await fetchAnimeFiles(config.links.repository)
    return config
  }),
)
