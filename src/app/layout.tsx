import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { Providers } from '~/app/components/providers'
import { Search } from '~/app/components/search'
import { TailwindIndicator } from '~/app/components/tailwind-indicator'
import { Toaster } from '~/components/ui/sonner'
import { fansubSlugs, importFansub } from '~/lib/fansub'
import { cn } from '~/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import Link from 'next/link'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// https://ui.shadcn.com/docs/installation/next
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s - OpenFansub',
    default: 'OpenFansub', // a default is required when creating a template
  },
  description: '[description]',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fansubs = await Promise.all(fansubSlugs.map(importFansub))

  return (
    <html lang="en">
      <body className={cn('container font-sans', fontSans.variable)}>
        <Providers>
          <header className="flex h-16 items-center gap-6">
            <Link href="/" className="font-bold">
              OpenFansub
            </Link>
            <Link href="/subtitles">Subtitles</Link>
            <div className="ml-auto">
              <Search
                fansubs={fansubs.map((f) => ({
                  slug: f.slug,
                  name: f.name,
                }))}
              />
            </div>
          </header>
          {children}
        </Providers>
        <Toaster />
        <TailwindIndicator />
      </body>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
    </html>
  )
}
