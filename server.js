import next from 'next'
import {createServer} from 'http'
import routes from './routes'

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

;(async () => {
  app.prepare()
  createServer(handler).listen(3000)
})()
