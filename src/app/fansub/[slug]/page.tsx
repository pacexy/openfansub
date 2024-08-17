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
import type { IconType } from 'react-icons'
import { FaGithub, FaQq, FaTelegramPlane } from 'react-icons/fa'
import { FaBilibili } from 'react-icons/fa6'
import { GoTable } from 'react-icons/go'
import { LuLink } from 'react-icons/lu'

const icons = {
  website: LuLink,
  project: GoTable,
  telegram: FaTelegramPlane,
  qq: FaQq,
  bilibili: FaBilibili,
}

function formatLink(platform: keyof FansubConfig['links'], value: string) {
  const url = new URL(value)
  const path = url.pathname.replace('/', '')

  return {
    website: url.host,
    project: 'Project',
    telegram: `@${path}`,
    qq: new URLSearchParams(url.search).get('group_code') ?? '', // TODO:
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
    icons: config.avatar,
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
          <div className="mb-4 aspect-square w-full rounded-full bg-muted">
            {config.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={config.avatar} alt={config.name} className="w-full" />
            )}
          </div>
          <h1 className="mb-2 text-2xl font-bold">{config.name}</h1>
          <p className="mb-4 text-muted-foreground">{config.description}</p>
          <ul className="space-y-3">
            <SocialLink
              icon={FaGithub}
              url={`https://github.com/${config.repo.owner}/${config.repo.name}`}
              label={`${config.repo.owner}/${config.repo.name}`}
            />
            {keys(config.links).map((key) => (
              <SocialLink
                key={key}
                icon={icons[key]}
                url={config.links[key]!}
                label={formatLink(key, config.links[key]!)}
              />
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
  icon,
  url,
  label,
}: {
  icon: IconType
  url: string
  label: string
}) {
  return (
    <li>
      <div className="flex items-center text-muted-foreground">
        {createElement(icon, {
          size: 20,
          className: 'mr-2',
        })}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-secondary-foreground"
        >
          {label}
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
        href={`https://github.com/${repo.owner}/${repo.name}/tree/${repo.branch}/${anime.path}`}
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
