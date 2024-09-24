export interface IRepo {
  owner: string
  name: string
  branch: string
}

export interface IRepoFile {
  path: string
  mode: string
  sha: string
  size: number
}

export async function fetchRepoFiles(repo: IRepo): Promise<{
  meta: { sha: string }
  files: IRepoFile[]
}> {
  const url = `https://ungh.cc/repos/${repo.owner}/${repo.name}/files/${repo.branch}`
  console.log(`[github] fetch: ${url}`)
  const response = await fetch(url)
  return await response.json()
}
