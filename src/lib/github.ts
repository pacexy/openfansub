import { Octokit } from '@octokit/rest'

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

    if (Array.isArray(contents)) {
      for (const item of contents) {
        if (item.type === 'file') {
          if (item.name.endsWith('.srt') || item.name.endsWith('.ass')) {
            const pathParts = item.path.split('/')
            const animeName = pathParts[pathParts.length - 2] // Parent directory name
            animes.push({
              name: animeName,
              path: item.path,
              subtitles: [item.name],
            })
          }
        } else if (item.type === 'dir') {
          await fetchFiles(item.path)
        }
      }
    }
  }

  await fetchFiles()
  return animes
}
