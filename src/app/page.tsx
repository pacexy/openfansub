import { fansubSlugs, importFansub } from '~/lib/fansub'
import Link from 'next/link'

export default async function Home() {
  const fansubs = await Promise.all(fansubSlugs.map(importFansub))

  return (
    <div>
      <nav>
        <ul>
          {fansubs.map((fansub) => (
            <li key={fansub.slug}>
              <Link href={`/fansub/${fansub.slug}`}>{fansub.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
