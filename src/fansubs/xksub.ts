import type { Fansub } from '~/lib/fansub'

export default {
  slug: 'xksub',
  name: '星空字幕组',
  avatar:
    'https://pic1.afdiancdn.com/user/801c9f34141d11e9be8552540025c377/avatar/bbb3ba533bb35e420077c38d15051564_w1500_h1499_s363.jpg?imageView2/1/w/240/h/240',
  repos: [
    {
      owner: 'XKsub',
      name: 'XKsub_Source',
      branch: 'master',
    },
  ],
  links: {
    bilibili: 'https://space.bilibili.com/237288712',
    sponsor: 'https://afdian.net/a/XKsub',
  },
} satisfies Fansub
