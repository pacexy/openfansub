'use client'

import type { FansubConfig } from '~/lib/fansub'
import { fuzzyMatch } from '~/lib/utils'
import { useState } from 'react'

export function Search({ fansubConfigs }: { fansubConfigs: FansubConfig[] }) {
  const [keyword, setKeyword] = useState('')

  return (
    <>
      <input
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ul>
        {fansubConfigs.map((config) =>
          Object.entries(config.subtitleDirs ?? {}).map(([repo, dirs]) =>
            dirs
              .filter(
                (dir) => keyword.length > 1 && fuzzyMatch(dir.path, keyword),
              )
              .map((dir) => (
                <li key={dir.path}>
                  {config.name}
                  <a>{dir.path}</a>
                </li>
              )),
          ),
        )}
      </ul>
    </>
  )
}
