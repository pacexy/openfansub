import {
  getAnimeDirs,
  importFansub,
  type IAnimeDir,
  type ISubtitlesRepo,
} from '~/lib/fansub'
import { fetchRepoFiles, type IRepo } from '~/lib/github'
import { GoRepo } from 'react-icons/go'

export async function Subtitles({ slug }: { slug: string }) {
  const fansub = await importFansub(slug)
  return (
    <ul className="space-y-4">
      {fansub.repos.map((repo) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </ul>
  )
}

async function Repo({ repo }: { repo: ISubtitlesRepo }) {
  const { files } = await fetchRepoFiles(repo)
  const animeDirs = getAnimeDirs(files, repo.entries)
  return (
    <li>
      <h3 className="mb-2 flex items-center text-sm text-muted-foreground">
        <GoRepo className="mr-2" size={16} />
        <a
          href={`https://github.com/${repo.owner}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {repo.owner}
        </a>
        <span className="mx-1">/</span>
        <a
          href={`https://github.com/${repo.owner}/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {repo.name}
        </a>
      </h3>
      <ul>
        {animeDirs.map((ad) => (
          <AnimeDir key={ad.path} repo={repo} animeDir={ad} />
        ))}
      </ul>
    </li>
  )
}

function AnimeDir({ repo, animeDir }: { repo: IRepo; animeDir: IAnimeDir }) {
  return (
    <li>
      <h3 className="text-lg">
        {animeDir.parent && (
          <span className="text-muted-foreground">{animeDir.parent}/</span>
        )}
        <a
          href={`https://github.com/${repo.owner}/${repo.name}/tree/${repo.branch}/${animeDir.path}`}
          className="text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {animeDir.name}
        </a>
      </h3>
    </li>
  )
}
