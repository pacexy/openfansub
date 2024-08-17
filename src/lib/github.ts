import { Octokit } from '@octokit/rest'

const supportedSubtitleExts = ['.srt', '.ass']
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface Anime {
  name: string
  path: string
  subtitles: string[]
}

export async function fetchAnimeFiles(repoUrl: string): Promise<Anime[]> {
  const animes: Map<string, Anime> = new Map()
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/')

  async function fetchFiles(path = '') {
    const url = `https://ungh.cc/repos/${owner}/${repo}/files/main${path ? '/' + path : ''}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()

    for (const item of data.files) {
      if (!supportedSubtitleExts.some((ext) => item.path.endsWith(ext)))
        continue

      const parts = item.path.split('/')
      const fileName = parts.pop()
      const parent = parts.join('/')
      const animeName = parts.pop()
      let anime = animes.get(parent)
      if (!anime) {
        anime = {
          name: animeName,
          path: parent,
          subtitles: [],
        }
        animes.set(parent, anime)
      }
      anime.subtitles.push(fileName)
    }
  }

  await fetchFiles()
  return Array.from(animes.values())
}
