import { readdir } from 'node:fs/promises'

export interface FansubConfig {
  slug: string
  name: string
  description?: string
  logo: string
  repo: string
  website?: string
  social?: {
    telegram?: string
    qq?: string
    bilibili?: string
  }
}

const fansubFiles = await readdir('./src/fansubs')
export const fansubs = fansubFiles.map((file) => file.replace(/\.ts$/, ''))
export const fansubConfigs: FansubConfig[] = await Promise.all(
  fansubs.map((fansub) =>
    import(`../fansubs/${fansub}`).then((module) => module.default),
  ),
)
