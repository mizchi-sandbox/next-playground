import next from 'next'
import express from 'express'
import {createServer} from 'http'
import routes from './routes'
import wait from './util/wait'

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

const apiCache = new Map()

async function fetchAricle(id) {
  if (apiCache.has(id)) {
    console.log("fetchAricle: Use cache", id)
    return apiCache.get(id)
  }
  // simulate server wait
  await wait(1000)
  const article = {
    id,
    body: `Generated: ${Date.now()}`
  }
  console.log("fetchAricle: Set cache", id)
  apiCache.set(id, article)
  return article
}

;(async () => {
  await app.prepare()
  const server = express()

  // Cache article by id
  server.get('/api/article/:id', async (req, res) => {
    // const queryParams = { id: req.params.id }
    const article = await fetchAricle(req.params.id)
    res.json(article)
  })

  // Cache article by id
  server.get('/article/:id', async (req, res) => {
    // const queryParams = { id: req.params.id }
    const params = await fetchAricle(req.params.id)
    await renderAndCache(req, res, 'article', params)
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})()

const ssrCache = new Map()

function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`)
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)
    // Let's cache this page
    console.log(`CACHE MISS: ${key}`)
    ssrCache.set(key, html)
    res.send(html)
  } catch (e) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
