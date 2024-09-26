import {
  getSubtitleDirs,
  importFansub,
  type Fansub,
  type ISubtitlesDir,
} from '~/lib/fansub'
import { fetchRepoFiles, type IRepo } from '~/lib/github'
import { GoRepo } from 'react-icons/go'

export async function Subtitles({ slug }: { slug: string }) {
  const fansub = await importFansub(slug)
  return (
    <ul className="space-y-4">
      {fansub.repos.map((repo) => (
        <Repo key={repo.name} repo={repo} fansub={fansub} />
      ))}
    </ul>
  )
}

async function Repo({ repo, fansub }: { repo: IRepo; fansub: Fansub }) {
  const { files } = await fetchRepoFiles(repo)
  const subtitleDirs = getSubtitleDirs(files, fansub.subtitle?.patterns)
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
        {subtitleDirs.map((sd) => (
          <SubtitlesDir key={sd.path} repo={repo} subtitleDir={sd} />
        ))}
      </ul>
    </li>
  )
}

function SubtitlesDir({
  repo,
  subtitleDir: sd,
}: {
  repo: IRepo
  subtitleDir: ISubtitlesDir
}) {
  return (
    <li>
      <h3 className="text-lg">
        {sd.parent && (
          <span className="text-muted-foreground">{sd.parent}/</span>
        )}
        <a
          href={`https://github.com/${repo.owner}/${repo.name}/tree/${repo.branch}/${sd.path}`}
          className="text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {sd.name}
        </a>
      </h3>
    </li>
  )
}
