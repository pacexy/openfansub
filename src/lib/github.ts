import assert from 'node:assert'

const supportedSubtitleExts = ['.srt', '.ass']

export interface IAnime {
  path: string
  subtitles: string[]
}

interface IFile {
  path: string
  mode: string
  sha: string
  size: number
}

async function fetchRepoFiles(repoUrl: string): Promise<{
  meta: { sha: string }
  files: IFile[]
}> {
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/')
  const url = `https://ungh.cc/repos/${owner}/${repo}/files/main`
  const response = await fetch(url)
  return await response.json()
}

export async function fetchAnimeFiles(repoUrl: string): Promise<IAnime[]> {
  const animes: Map<string, IAnime> = new Map()
  const { files } = await fetchRepoFiles(repoUrl)

  for (const item of files) {
    if (!supportedSubtitleExts.some((ext) => item.path.endsWith(ext))) continue

    const parts = item.path.split('/')
    const fileName = parts.pop()
    const path = parts.join('/')

    assert(fileName, 'fileName should not be empty')

    let anime = animes.get(path)
    if (!anime) {
      anime = {
        path,
        subtitles: [],
      }
      animes.set(path, anime)
    }
    anime.subtitles.push(fileName)
  }

  return Array.from(animes.values())
}
