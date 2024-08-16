import { readdir } from 'node:fs/promises'

export interface FansubConfig {
  slug: string
  name: string
  description?: string
  logo: string
  links: {
    repository?: string
    website?: string
    telegram?: string
    qq?: string
    bilibili?: string
  }
  subtitles: {
    [key: string]: string
  }
}

const fansubFiles = await readdir('./src/fansubs')
export const fansubs = fansubFiles.map((file) => file.replace(/\.ts$/, ''))
export const fansubConfigs: FansubConfig[] = await Promise.all(
  fansubs.map((fansub) =>
    import(`../fansubs/${fansub}`).then((module) => module.default),
  ),
)
