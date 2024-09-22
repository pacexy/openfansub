import { Button } from '~/components/ui/button'
import {
  fansubConfigs,
  fansubs,
  type ISubtitlesDir,
  type ResolvedFansubConfig,
} from '~/lib/fansub'
import type { IRepo } from '~/lib/github'
import { keys } from '~/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createElement } from 'react'
import type { IconType } from 'react-icons'
import { FaQq, FaTelegramPlane } from 'react-icons/fa'
import { FaBilibili, FaWeibo, FaXTwitter } from 'react-icons/fa6'
import { GoMail, GoRepo, GoReport, GoTable } from 'react-icons/go'
import { LuLink } from 'react-icons/lu'
import { SiGithubsponsors } from 'react-icons/si'

const icons = {
  website: LuLink,
  project: GoTable,
  telegram: FaTelegramPlane,
  qq: FaQq,
  bilibili: FaBilibili,
  twitter: FaXTwitter,
  weibo: FaWeibo,
  email: GoMail,
  sponsor: SiGithubsponsors,
}

function formatLink(
  platform: keyof ResolvedFansubConfig['links'],
  config: ResolvedFansubConfig,
) {
  const url = new URL(config.links[platform]!)
  const path = url.pathname.replace('/', '')

  return {
    website: config.status === 'inactive' ? <del>{url.host}</del> : url.host,
    project: 'Project',
    telegram: `@${path}`,
    qq: (new URLSearchParams(url.search).get('group_code') ?? path) || 'QQ',
    bilibili: path,
    twitter: `@${path}`,
    weibo: `@${path}`,
    email: url.pathname,
    sponsor: url.host + url.pathname,
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
          {config.avatar && (
            <div className="mb-4 aspect-square w-full overflow-hidden rounded-full">
              <img src={config.avatar} alt={config.name} className="w-full" />
            </div>
          )}
          <h1 className="mb-2 text-2xl font-bold">{config.name}</h1>
          <p className="mb-4 text-muted-foreground">{config.description}</p>
          <ul className="space-y-3">
            {keys(config.links).map((key) => (
              <SocialLink
                key={key}
                icon={icons[key]}
                url={config.links[key]!}
                label={formatLink(key, config)}
              />
            ))}
            <SocialLink
              icon={GoReport}
              url={`https://github.com/${config.repos[0].owner}/${config.repos[0].name}/issues`}
              label="Feedback"
            />
          </ul>
        </div>

        {/* right */}
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Subtitles</h2>
          <ul className="space-y-4">
            {config.repos.map((repo) => (
              <Repo key={repo.name} repo={repo} config={config} />
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
  label: React.ReactNode
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

function Repo({ repo, config }: { repo: IRepo; config: ResolvedFansubConfig }) {
  return (
    <li>
      <h3 className="mb-2 flex items-center text-sm text-muted-foreground">
        <GoRepo className="mr-2" size={16} />
        <a
          href={`https://github.com/${repo.owner}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {repo.owner}
        </a>
        <span className="mx-1">/</span>
        <a
          href={`https://github.com/${repo.owner}/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {repo.name}
        </a>
      </h3>
      <ul>
        {config.subtitleDirs[`${repo.owner}/${repo.name}`]?.map((sd) => (
          <SubtitlesDir key={sd.path} repo={repo} subtitleDir={sd} />
        ))}
      </ul>
    </li>
  )
}

function SubtitlesDir({
  repo,
  subtitleDir: sd,
}: {
  repo: IRepo
  subtitleDir: ISubtitlesDir
}) {
  return (
    <li>
      <h3 className="text-lg">
        {sd.parent && (
          <span className="text-muted-foreground">{sd.parent}/</span>
        )}
        <a
          href={`https://github.com/${repo.owner}/${repo.name}/tree/${repo.branch}/${sd.path}`}
          className="text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {sd.name}
        </a>
      </h3>
    </li>
  )
}
