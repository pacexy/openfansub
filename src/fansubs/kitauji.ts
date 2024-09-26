import type { Fansub } from '~/lib/fansub'

export default {
  slug: 'kitauji',
  name: '北宇治字幕组',
  description: '我们是北宇治字幕组，是由一群喜欢动画的人们组成的非盈利字幕组。',
  avatar: 'https://avatars.githubusercontent.com/u/121954830?s=200&v=4',
  repos: [
    {
      owner: 'Kitauji-Sub',
      name: 'Subtitles',
      branch: 'main',
    },
  ],
  links: {
    website: 'https://kitauji.inari.site',
    project: 'https://github.com/orgs/Kitauji-Sub/projects/2',
    telegram: 'https://t.me/KitaUji',
    qq: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=ED0Qrm-TRS5mtfTQwrFMBQEtsrVyqAQg&authKey=fov%2FXdbhFFvjnKwZX3u7xGkY7LwlfIaplbcLu64Zbcrv2hxHAxuj2aqjDhSlQba7&noverify=0&group_code=232487445',
    bilibili: 'https://space.bilibili.com/3546697424702177',
  },
} satisfies Fansub
