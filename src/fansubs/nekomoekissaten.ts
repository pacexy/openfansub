import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'nekomoekissaten',
  name: '喵萌奶茶屋',
  repos: [
    {
      owner: 'Nekomoekissaten-SUB',
      name: 'Nekomoekissaten-Storage',
      branch: 'master',
    },
  ],
  links: {
    project: 'https://github.com/orgs/Nekomoekissaten-SUB/projects/1',
  },
} satisfies FansubConfig

export default config
