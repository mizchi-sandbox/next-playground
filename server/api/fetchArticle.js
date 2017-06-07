import wait from '../../util/wait'

export default async function fetchArticle(id) {
  await wait(500)
  return {
    id,
    body: `Generated: ${Date.now()}`
  }
}
