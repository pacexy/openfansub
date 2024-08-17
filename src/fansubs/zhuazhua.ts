import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'zhuazhua',
  name: '爪爪字幕组',
  description: '我们是爪爪字幕组，是由一群喜欢动画的人们组成的非盈利字幕组。',
  avatar: 'https://avatars.githubusercontent.com/u/114382580?v=4',
  repos: [
    {
      owner: 'ZhuaZhuaSub',
      name: 'ZhuaZhuaStudio',
      branch: 'main',
    },
    {
      owner: 'ZhuaZhuaSub',
      name: 'ZhuaZhuaSub',
      branch: 'main',
    },
  ],
  links: {
    website: 'https://kitauji.inari.site',
  },
} satisfies FansubConfig

export default config
