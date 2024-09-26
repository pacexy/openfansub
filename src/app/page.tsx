import { fansubSlugs, importFansub } from '~/lib/fansub'
import Link from 'next/link'

export default async function Home() {
  return (
    <div>
      <nav>
        <ul>
          {fansubSlugs.map(async (slug) => (
            <li key={slug}>
              <Link href={`/fansub/${slug}`}>
                {(await importFansub(slug)).name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
