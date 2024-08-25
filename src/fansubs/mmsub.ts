import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'mmsub',
  name: '咪梦动漫组',
  status: 'inactive',
  repos: [
    {
      owner: 'DMYJS',
      name: 'MMSUB',
      branch: 'master',
    },
  ],
  links: {
    telegram: 'https://t.me/ShareAnimation',
    twitter: 'https://twitter.com/MiMengSub',
    weibo: 'https://www.weibo.com/MiMengSub',
  },
} satisfies FansubConfig

export default config
