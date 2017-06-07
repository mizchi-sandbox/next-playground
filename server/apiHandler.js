import createRouteCacher from 'route-cache-strategy'
import LRU from 'lru-cache'
import strategies from '../cacheStrategies'
import fetchArticle from './api/fetchArticle'

// Run this function on strategies's key is changed
// or expire cache.
// This function can take promise
// url is needed as 1st argument params for route handler
const load = ({ url, id }) => fetchArticle(id)

const store = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60
})

const loadWithCache = createRouteCacher(strategies, load, store)

export default server => {
  server.get('/api/article/:id', async (req, res) => {
    const params = await loadWithCache({ url: req.url, id: req.params.id })
    res.json(params)
  })
}
