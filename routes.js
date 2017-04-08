const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('index', '/index')
routes.add('about', '/about')
routes.add('async', '/async')
routes.add('prefetch', '/prefetch')
routes.add('article', '/article/:id')
routes.add('scroll', '/scroll')