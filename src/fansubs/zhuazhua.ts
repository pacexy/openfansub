import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'zhuazhua',
  name: '爪爪字幕组',
  status: 'inactive',
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
    website: 'https://zhuazhua.ga',
  },
} satisfies FansubConfig

export default config
