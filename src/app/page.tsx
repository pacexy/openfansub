import { readdir } from 'fs/promises'
import type { FansubConfig } from '~/type'
import Link from 'next/link'

export default async function Home() {
  const fansubs = await readdir('./src/fansubs')
  console.log(fansubs)
  const fansubConfigs: FansubConfig[] = await Promise.all(
    fansubs.map((fansub) =>
      import(`../fansubs/${fansub}`).then((module) => module.default),
    ),
  )

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
