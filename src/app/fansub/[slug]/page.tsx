import { Button } from '~/components/ui/button'
import {
  fansubConfigs,
  fansubs,
  type FansubConfig,
  type IAnime,
} from '~/lib/fansub'
import type { IRepo } from '~/lib/github'
import { keys } from '~/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createElement } from 'react'
import { FaGithub, FaQq, FaTelegramPlane } from 'react-icons/fa'
import { FaBilibili } from 'react-icons/fa6'
import { LuLink } from 'react-icons/lu'

const icons = {
  website: LuLink,
  telegram: FaTelegramPlane,
  qq: FaQq,
  bilibili: FaBilibili,
}

function formatLink(platform: keyof FansubConfig['links'], value: string) {
  const url = new URL(value)
  const path = url.pathname.replace('/', '')

  return {
    website: url.host,
    telegram: `@${path}`,
    qq: new URLSearchParams(url.search).get('group_code'),
    bilibili: path,
  }[platform]
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const config = fansubConfigs.find((c) => c.slug === params.slug)!
  return {
    title: config.name,
    description: config.description,
    icons: config.logo,
  }
}

export async function generateStaticParams() {
  return fansubs.map((slug) => ({ slug }))
}

export default function FansubPage({ params }: { params: { slug: string } }) {
  const config = fansubConfigs.find((c) => c.slug === params.slug)!
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="mb-4 inline-block">
        <Button variant="outline">← Back to Home</Button>
      </Link>
      <div className="mt-4 grid grid-cols-1 gap-16 md:grid-cols-3">
        {/* left */}
        <div className="md:col-span-1">
          <div className="mb-4 aspect-square w-full rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={config.logo} alt={config.name} className="w-full" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">{config.name}</h1>
          <p className="mb-4 text-muted-foreground">{config.description}</p>
          <ul className="space-y-3">
            {keys(config.links).map((key) => (
              <SocialLink key={key} platform={key} config={config} />
            ))}
          </ul>
        </div>

        {/* right */}
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Subtitles</h2>
          <ul className="space-y-4">
            {(config.animes ?? []).map((anime) => (
              <Anime key={anime.path} repo={config.repo} anime={anime} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function SocialLink({
  platform,
  config,
}: {
  platform: keyof FansubConfig['links']
  config: FansubConfig
}) {
  return (
    <li>
      <div className="flex items-center text-muted-foreground">
        {createElement(icons[platform], {
          size: 20,
          className: 'mr-2',
        })}
        <a
          href={config.links[platform]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-secondary-foreground"
        >
          {formatLink(platform, config.links[platform]!)}
        </a>
      </div>
    </li>
  )
}

function Anime({ repo, anime }: { repo: IRepo; anime: IAnime }) {
  const parts = anime.path.split('/')
  const name = parts.pop()
  const parent = parts.join('/')

  return (
    <li className="border-b pb-2">
      <a
        href={`https://github.com/${repo.name}/tree/${repo.branch}/${anime.path}`}
        className="text-blue-600 hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-lg font-semibold">{name}</h3>
      </a>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{parent}</span>
        <span>{anime.subtitles.length} subtitles</span>
      </div>
    </li>
  )
}
