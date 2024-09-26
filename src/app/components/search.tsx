'use client'

import { Input } from '~/components/ui/input'
import type { Fansub } from '~/lib/fansub'
import { cn } from '~/lib/utils'
import { useState } from 'react'

type SanitizedFansub = Pick<Fansub, 'slug' | 'name'>

export function Search({ fansubs }: { fansubs: SanitizedFansub[] }) {
  const [keyword, setKeyword] = useState('')
  const reg = new RegExp(keyword, 'ig')

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
          'absolute right-0 mt-4 h-80 w-96 space-y-1 overflow-auto border bg-card px-2 py-1',
          'hidden',
        )}
      >
        {fansubs
          .filter((fansub) => reg.test(fansub.name) || reg.test(fansub.slug))
          .map((fansub) => (
            <li key={fansub.name}>
              <a
                className="text-foreground"
                dangerouslySetInnerHTML={{
                  __html: `${fansub.name} ${fansub.slug}`.replace(
                    reg,
                    (match) => `<mark>${match}</mark>`,
                  ),
                }}
              ></a>
            </li>
          ))}
      </ul>
    </div>
  )
}
