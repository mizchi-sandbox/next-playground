import next from 'next'
import express from 'express'
import {createServer} from 'http'
import routes from './routes'
import wait from './util/wait'

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

import hash from 'object-hash'
import LRU from 'lru-cache'
import wrapFuncWithCache from './util/wrapFuncWithCache'

const fetchArticle = wrapFuncWithCache(async id => {
  // simulate server wait
  await wait(1000)
  return {
    id,
    body: `Generated: ${Date.now()}`
  }
}, {
  createCacheKey(id) {
    // Use lastUpdatedAt in real world
    return id
  },
  storage: new LRU({
    max: 500,
    maxAge: 1000 * 60 * 60
  })
})

const renderHTML = wrapFuncWithCache(async ({render}) => {
  return render()
}, {
  createCacheKey({params}) {
    // Use lastUpdatedAt in real world
    return hash(params)
  },
  storage: new LRU({
    max: 500,
    maxAge: 1000 * 60 * 60
  })
})

;(async () => {
  await app.prepare()
  const server = express()

  // Cache article by id
  server.get('/api/article/:id', async (req, res) => {
    const params = await fetchArticle(req.params.id)
    res.json(params)
  })
  server.get('/article/:id', async (req, res) => {
    const params = await fetchArticle(req.params.id)
    const html = await renderHTML({
      params,
      render: () => app.renderToHTML(req, res, 'article', params)
    })
    res.send(html)
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})()
