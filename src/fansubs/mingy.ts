import type { Fansub } from '~/lib/fansub'

export default {
  slug: 'mingy',
  name: 'MingY',
  repos: [
    {
      owner: 'MingYSub',
      name: 'SubsArchive',
      branch: 'main',
      entries: ['Archive'],
    },
  ],
  links: {
    project: 'https://github.com/users/MingYSub/projects/1',
    telegram: 'https://t.me/MingYSub',
    qq: 'https://jq.qq.com/?_wv=1027&k=M7BTPKx4',
  },
} satisfies Fansub
