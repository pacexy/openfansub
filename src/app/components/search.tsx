'use client'

import type { FansubConfig } from '~/lib/fansub'
import { useState } from 'react'

export function Search({ fansubConfigs }: { fansubConfigs: FansubConfig[] }) {
  const [keyword, setKeyword] = useState('')
  const reg = new RegExp(keyword, 'i')

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
              .filter((dir) => keyword.length > 1 && reg.test(dir.path))
              .map((dir) => (
                <li key={dir.path}>
                  {config.name}
                  <a
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
    </>
  )
}
