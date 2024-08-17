interface IFile {
  path: string
  mode: string
  sha: string
  size: number
}

export async function fetchRepoFiles(repoUrl: string): Promise<{
  meta: { sha: string }
  files: IFile[]
}> {
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/')
  const url = `https://ungh.cc/repos/${owner}/${repo}/files/main`
  const response = await fetch(url)
  return await response.json()
}
