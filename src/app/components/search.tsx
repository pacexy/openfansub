'use client'

import { Input } from '~/components/ui/input'
import type { FansubConfig } from '~/lib/fansub'
import { cn } from '~/lib/utils'
import { useState } from 'react'

export function Search({ fansubConfigs }: { fansubConfigs: FansubConfig[] }) {
  const [keyword, setKeyword] = useState('')
  const reg = new RegExp(keyword, 'i')

  // avoid rendering a long list
  const minLength = /^[a-zA-Z]/.test(keyword) ? 2 : 1

  return (
    <div className="relative [&_ul]:focus-within:block">
      <Input
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keyword.length >= minLength && (
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
          {fansubConfigs.map((config) =>
            // TODO: remove !
            Object.values(config.subtitleDirs!).map((dirs) =>
              dirs
                .filter((dir) => reg.test(dir.path))
                .map((dir) => (
                  <li key={dir.path}>
                    <span className="mr-2 bg-muted px-1 py-0.5 text-sm text-muted-foreground">
                      {config.name}
                    </span>
                    <a
                      className="text-foreground"
                      dangerouslySetInnerHTML={{
                        __html: dir.path.replace(
                          reg,
                          (match) => `<mark>${match}</mark>`,
                        ),
                      }}
                    ></a>
                  </li>
                )),
            ),
          )}
        </ul>
      )}
    </div>
  )
}
