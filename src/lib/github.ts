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
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/')

  const animes: Anime[] = []

  async function fetchFiles(path = '') {
    const { data: contents } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    })

    if (!Array.isArray(contents)) return

    for (const item of contents) {
      if (item.type === 'dir') {
        await fetchFiles(item.path)
        continue
      }
      if (item.type === 'file') {
        if (!supportedSubtitleExts.includes(item.name)) continue
        const pathParts = item.path.split('/')
        const parentName = pathParts[pathParts.length - 2]
        animes.push({
          name: parentName,
          path: item.path,
          subtitles: [item.name],
        })
      }
    }
  }

  await fetchFiles()
  return animes
}
