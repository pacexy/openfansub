import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'haruhana',
  name: '❀拨雪寻春❀',
  description:
    '我们秉持初心，只做喜欢的作品，只做高质量的中日双语字幕。因为爱，所以专注。所以拨雪寻春，烧灯续昼……',
  // fetched from https://www.haruhana.org/wp-content/uploads/2024/08/cropped-Haruhana-192x192.jpg'
  // to fix cors
  avatar: '/haruhana.png',
  repo: {
    owner: 'HaruhanaSub',
    name: 'Haruhana-Fansub_Source',
    branch: 'main',
  },
  links: {
    website: 'https://www.haruhana.org/',
  },
  subtitle: {
    exts: [/\[Subtitles\]\.7z$/],
  },
} satisfies FansubConfig

export default config
