import type { Fansub } from '~/lib/fansub'

export default {
  slug: 'haruhana',
  name: '❀拨雪寻春❀',
  description:
    '我们秉持初心，只做喜欢的作品，只做高质量的中日双语字幕。因为爱，所以专注。所以拨雪寻春，烧灯续昼……',
  // fetched from https://www.haruhana.org/wp-content/uploads/2024/08/cropped-Haruhana-192x192.jpg'
  // to fix cors
  avatar: '/haruhana.png',
  repos: [
    {
      owner: 'HaruhanaSub',
      name: 'Haruhana-Fansub_Source',
      branch: 'main',
    },
  ],
  links: {
    website: 'https://www.haruhana.org/',
    project: 'https://github.com/users/HaruhanaSub/projects/2',
    qq: 'https://qm.qq.com/q/LFOmKxHXsm',
    email: 'mailto:mharuhanasub@gmail.com',
  },
  subtitle: {
    exts: [/(?<subtitle>[^/]+\[Subtitles\]\.7z)$/],
  },
} satisfies Fansub
