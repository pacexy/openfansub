import type { FansubConfig } from '~/lib/fansub'

const config = {
  slug: 'kitauji',
  name: '北宇治',
  description: '我们是北宇治字幕组，是由一群喜欢动画的人们组成的非盈利字幕组。',
  logo: 'https://avatars.githubusercontent.com/u/121954830?s=200&v=4',
  repo: 'https://github.com/Kitauji-Sub/Subtitles',
  website: 'https://kitauji.inari.site',
  social: {
    telegram: 'https://t.me/KitaUji',
    qq: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=ED0Qrm-TRS5mtfTQwrFMBQEtsrVyqAQg&authKey=fov%2FXdbhFFvjnKwZX3u7xGkY7LwlfIaplbcLu64Zbcrv2hxHAxuj2aqjDhSlQba7&noverify=0&group_code=232487445',
    bilibili: 'https://space.bilibili.com/3546697424702177',
  },
  subtitles: {
    'ATRI - My Dear Moments':
      'https://github.com/Kitauji-Sub/Subtitles/tree/main/TV/2024/07/ATRI%20-My%20Dear%20Moments-',
    'Oshi no Ko - Season 2':
      'https://github.com/Kitauji-Sub/Subtitles/tree/main/TV/2024/07/%E3%80%90Oshi%20no%20Ko%E3%80%91%20-%20Season%202',
  },
} satisfies FansubConfig

export default config
