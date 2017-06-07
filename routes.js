const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())
export const Link = routes.Link
export const Router = routes.Router

routes.add('index', '/index')
routes.add('article', '/article/:id')
routes.add('redux', '/redux')
