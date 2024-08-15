import { readdir } from 'fs/promises'

export async function generateStaticParams() {
  const fansubs = await readdir('./src/fansubs')

  return fansubs.map((fansub) => ({
    slug: fansub.replace(/\.ts$/, ''),
  }))
}

export default async function FansubPage({
  params,
}: {
  params: { slug: string }
}) {
  const { default: config } = await import(`../../../fansubs/${params.slug}`)
  return (
    <div>
      <h1>{config.name}</h1>
      <p>{config.description}</p>
      <p>{config.website}</p>
    </div>
  )
}
