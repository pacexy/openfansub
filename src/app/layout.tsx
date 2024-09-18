import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { Providers } from '~/app/components/providers'
import { Search } from '~/app/components/search'
import { TailwindIndicator } from '~/app/components/tailwind-indicator'
import { Toaster } from '~/components/ui/sonner'
import { fansubConfigs } from '~/lib/fansub'
import { cn } from '~/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('font-sans', fontSans.variable)}>
        <Providers>
          <header className="flex h-16 items-center justify-between px-4">
            OpenFansub
            <Search fansubConfigs={fansubConfigs} />
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
