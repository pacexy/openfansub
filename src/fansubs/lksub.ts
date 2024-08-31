import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'lksub',
  name: 'LKSUB',
  status: 'inactive',
  repos: [
    {
      owner: 'qiusj759039257',
      name: 'LKSUB',
      branch: 'master',
    },
  ],
  links: {},
} satisfies FansubConfig

export default config
