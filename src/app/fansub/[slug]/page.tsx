import { Button } from '~/components/ui/button'
import { fansubConfigs, fansubs, type FansubConfig } from '~/lib/fansub'
import { keys } from '~/lib/utils'
import Link from 'next/link'
import { createElement } from 'react'
import { FaGithub, FaQq, FaTelegramPlane } from 'react-icons/fa'
import { FaBilibili } from 'react-icons/fa6'
import { LuLink } from 'react-icons/lu'

const icons = {
  repository: FaGithub,
  website: LuLink,
  telegram: FaTelegramPlane,
  qq: FaQq,
  bilibili: FaBilibili,
}

function formatLink(key: keyof FansubConfig['links'], value: string) {
  const url = new URL(value)
  if (key === 'repository') {
    return url.pathname.replace('/', '')
  }
  if (key === 'website') {
    return url.host
  }
  if (key === 'telegram') {
    return `@${url.pathname.replace('/', '')}`
  }
  if (key === 'qq') {
    return new URLSearchParams(url.search).get('group_code')
  }
  if (key === 'bilibili') {
    return url.pathname.replace('/', '')
  }
}

export async function generateStaticParams() {
  return fansubs.map((slug) => ({ params: { slug } }))
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={config.logo}
            alt={config.name}
            className="mb-4 w-full rounded-full"
          />
          <h1 className="mb-2 text-2xl font-bold">{config.name}</h1>
          <p className="mb-4 text-muted-foreground">{config.description}</p>
          <ul className="space-y-3">
            {keys(config.links).map((key) => (
              <li key={key}>
                <div className="flex items-center text-muted-foreground">
                  {createElement(icons[key as keyof typeof icons], {
                    size: 20,
                    className: 'mr-2',
                  })}
                  <a
                    href={config.links[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary-foreground"
                  >
                    {formatLink(key, config.links[key]!)}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* right */}
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Subtitles</h2>
          <ul className="space-y-4">
            {Object.entries(config.subtitles).map(([title, link]) => (
              <li key={title} className="border-b pb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <a
                  href={link}
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Subtitles
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
