import { fansubConfigs } from '~/lib/fansub'
import Link from 'next/link'

export default async function Home() {
  return (
    <div>
      <nav>
        <ul>
          {fansubConfigs.map((fansub) => (
            <li key={fansub.slug}>
              <Link href={`/fansub/${fansub.slug}`}>{fansub.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
