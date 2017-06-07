import 'isomorphic-fetch'
import next from 'next'
import express from 'express'
import { createServer } from 'http'
import routes from './routes'
import apiHandler from './server/apiHandler'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const nextHandler = routes.getRequestHandler(app)
;(async () => {
  await app.prepare()
  const server = express()

  apiHandler(server)

  server.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})()
