import { fansubSlugs, importFansub } from '~/lib/fansub'
import { cn } from '~/lib/utils'
import Link from 'next/link'

export default async function Home() {
  const fansubs = await Promise.all(fansubSlugs.map(importFansub))
  return (
    <div>
      <nav>
        <ul className="space-y-3">
          {fansubs.map((f) => (
            <li
              key={f.slug}
              className={cn(
                'border-l-4 pl-2',
                f.status !== 'inactive' && 'border-green-200',
              )}
            >
              <Link href={`/fansub/${f.slug}`}>{f.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
