import { Subtitles } from '~/components/subtitles'
import { fansubSlugs, importFansub, type Fansub } from '~/lib/fansub'
import { keys } from '~/lib/utils'
import type { Metadata } from 'next'
import { createElement } from 'react'
import type { IconType } from 'react-icons'
import { FaQq, FaTelegramPlane } from 'react-icons/fa'
import { FaBilibili, FaWeibo, FaXTwitter } from 'react-icons/fa6'
import { GoMail, GoReport, GoTable } from 'react-icons/go'
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

function formatLink(platform: keyof Fansub['links'], fansub: Fansub) {
  const url = new URL(fansub.links[platform]!)
  const path = url.pathname.replace('/', '')

  return {
    website: fansub.status === 'inactive' ? <del>{url.host}</del> : url.host,
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const fansub = await importFansub(params.slug)
  return {
    title: fansub.name,
    description: fansub.description,
    icons: fansub.avatar,
  }
}

export async function generateStaticParams() {
  return fansubSlugs.map((slug) => ({ slug }))
}

export default async function FansubPage({
  params,
}: {
  params: { slug: string }
}) {
  const fansub = await importFansub(params.slug)
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
      {/* left */}
      <div className="md:col-span-1">
        {fansub.avatar && (
          <div className="mb-4 aspect-square w-full overflow-hidden rounded-full">
            <img src={fansub.avatar} alt={fansub.name} className="w-full" />
          </div>
        )}
        <h1 className="mb-2 text-2xl font-bold">{fansub.name}</h1>
        <p className="mb-4 text-muted-foreground">{fansub.description}</p>
        <ul className="space-y-3">
          {keys(fansub.links).map((key) => (
            <SocialLink
              key={key}
              icon={icons[key]}
              url={fansub.links[key]!}
              label={formatLink(key, fansub)}
            />
          ))}
          <SocialLink
            icon={GoReport}
            url={`https://github.com/${fansub.repos[0].owner}/${fansub.repos[0].name}/issues`}
            label="Feedback"
          />
        </ul>
      </div>

      {/* right */}
      <div className="md:col-span-2">
        <h2 className="mb-4 text-2xl font-bold">Subtitles</h2>
        <Subtitles slug={params.slug} />
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
