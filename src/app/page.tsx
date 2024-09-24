import { fansubDefs } from '~/lib/fansub'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          {fansubDefs.map((fansub) => (
            <li key={fansub.slug}>
              <Link href={`/fansub/${fansub.slug}`}>{fansub.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
