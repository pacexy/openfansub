import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'billionmetalab',
  name: '亿次研同好会',
  avatar: 'https://avatars.githubusercontent.com/u/96037629?v=4',
  repos: [
    {
      owner: 'microseventh',
      name: 'BillionMetaLab_AssSubs',
      branch: 'main',
    },
  ],
  links: {
    website: 'https://blog.billionmetalab.eu.org',
    telegram: 'https://t.me/Billion_Meta_Lab',
    email: 'mailto:billionmetalab@gmail.com',
  },
} satisfies FansubConfig

export default config
