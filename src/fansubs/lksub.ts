import type { Fansub } from '~/lib/fansub'

export default {
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
  subtitle: {
    exts: [/\/(?<subtitle>(?:\d+\/)?[^/]+\.(?:ass|srt))$/],
  },
} satisfies Fansub
