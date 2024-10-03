'use client'

import { Input } from '~/components/ui/input'
import type { Fansub } from '~/lib/fansub'
import { cn } from '~/lib/utils'
import { useState } from 'react'

// So we can serialize the fansub data to be sent from
// the server to the client.
type SerializableFansub = Pick<Fansub, 'slug' | 'name'>

export function Search({ fansubs }: { fansubs: SerializableFansub[] }) {
  const [keyword, setKeyword] = useState('')
  const reg = new RegExp(keyword, 'ig')

  const highlight = (text: string) => {
    if (!keyword) return text
    return text.replace(reg, (match) => `<mark>${match}</mark>`)
  }

  return (
    <div className="relative [&_ul]:focus-within:block">
      <Input
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ul
        // The tabIndex attribute allows the ul to receive focus.
        // Combined with `[&_ul]:focus-within:block` of its parent,
        // this ensures the list remains visible when clicked.
        tabIndex={0}
        className={cn(
          'absolute right-0 mt-4 max-h-80 w-max space-y-1 overflow-auto border bg-card px-2 py-1',
          'hidden',
        )}
      >
        {fansubs
          .filter((f) => reg.test(f.name) || reg.test(f.slug))
          .map((f) => (
            <li key={f.name}>
              <a href={`/fansub/${f.slug}`}>
                <span
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: highlight(f.name) }}
                ></span>
                <span
                  className="ml-1 bg-muted px-1 text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: highlight(f.slug) }}
                ></span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}
