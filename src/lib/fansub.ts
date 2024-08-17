import { readdir } from 'node:fs/promises'
import { fetchAnimeFiles, type IAnime } from './github'

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

const fansubFiles = await readdir('./src/fansubs')
export const fansubs = fansubFiles.map((file) => file.replace(/\.ts$/, ''))

export const fansubConfigs: FansubConfig[] = await Promise.all(
  fansubs.map(async (fansub) => {
    const config = (await import(`../fansubs/${fansub}`)).default
    config.animes = await fetchAnimeFiles(config.links.repository)
    return config
  }),
)
