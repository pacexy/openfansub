import { fansubConfigs, fansubs } from '~/lib/fansub'

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
    <div>
      <h1>{config.name}</h1>
      <p>{config.description}</p>
      <p>{config.website}</p>
    </div>
  )
}
