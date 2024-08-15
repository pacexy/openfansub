import { cn } from '~/lib/utils'

export function TailwindIndicator() {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-0 right-0 z-50 flex divide-x-2 bg-white">
      <ScreenSize />
      <Theme />
    </div>
  )
}

function ScreenSize() {
  return (
    <Item className="flex items-center justify-center bg-background font-mono text-foreground">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </Item>
  )
}

function Theme() {
  return (
    <div className="flex">
      <Item className="bg-card text-card-foreground">ca</Item>
      <Item className="bg-popover text-popover-foreground">po</Item>
      <Item className="bg-primary text-primary-foreground">pr</Item>
      <Item className="bg-secondary text-secondary-foreground">se</Item>
      <Item className="bg-muted text-muted-foreground">mu</Item>
      <Item className="bg-accent text-accent-foreground">ac</Item>
      <Item className="bg-destructive text-destructive-foreground">de</Item>
      <Item className="bg-warning text-warning-foreground">wa</Item>
      <Item className="bg-success text-success-foreground">su</Item>
    </div>
  )
}

function Item({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  return <div className={cn('px-1 font-mono', className)}>{children}</div>
}
