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
