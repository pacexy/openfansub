import { fansubSlugs } from '~/lib/fansub'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          {fansubSlugs.map((slug) => (
            <li key={slug}>
              <Link href={`/fansub/${slug}`}>{slug}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
