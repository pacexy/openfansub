import { Subtitles } from '~/components/subtitles'
import { fansubSlugs } from '~/lib/fansub'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subtitles',
  description: 'All subtitle files of fansubs.',
}

export default async function SubtitlesPage() {
  return (
    <div className="space-y-8">
      {fansubSlugs.map((slug) => (
        <Subtitles key={slug} slug={slug} />
      ))}
    </div>
  )
}
