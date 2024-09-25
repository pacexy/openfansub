import { Subtitles } from '~/components/subtitles'
import { fansubSlugs } from '~/lib/fansub'

export default async function Home() {
  return (
    <div>
      {fansubSlugs.map((slug) => (
        <Subtitles key={slug} slug={slug} />
      ))}
    </div>
  )
}
