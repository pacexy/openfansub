import { Button } from '~/components/ui/button'
import { fansubConfigs, fansubs } from '~/lib/fansub'
import Link from 'next/link'
import { createElement } from 'react'
import { FaQq, FaTelegram } from 'react-icons/fa'
import { LuLink } from 'react-icons/lu'

const icons = {
  telegram: FaTelegram,
  qq: FaQq,
  bilibili: LuLink,
}

export async function generateStaticParams() {
  return fansubs.map((slug) => ({ params: { slug } }))
}

export default async function FansubPage({
  params,
}: {
  params: { slug: string }
}) {
  const config = fansubConfigs.find((c) => c.slug === params.slug)!
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="mb-4 inline-block">
        <Button variant="outline">← Back to Home</Button>
      </Link>
      <div className="mt-4 grid grid-cols-1 gap-16 md:grid-cols-3">
        {/* Left column: Fansub Information */}
        <div className="md:col-span-1">
          <img
            src={config.logo}
            alt={config.name}
            className="mb-4 w-full rounded-full"
          />
          <h1 className="mb-2 text-2xl font-bold">{config.name}</h1>
          <p className="mb-4 text-muted-foreground">{config.description}</p>
          <ul className="space-y-4">
            {Object.entries(config.social).map(([key, value]) => (
              <li key={key}>
                <div className="flex items-center">
                  {createElement(icons[key as keyof typeof icons], {
                    size: 20,
                    className: 'mr-2 text-accent-foreground',
                  })}
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    {key}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: Subtitles */}
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
