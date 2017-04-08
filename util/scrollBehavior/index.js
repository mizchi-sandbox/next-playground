import createScrollBehavior from './createScrollBehavior'
import Router from 'next/router'

export default (opts) => {
  // Run on only client
  if (global.window) {
    // need window.history.sessionStorage
    const scrollBehavior = createScrollBehavior(opts)
    Router.onRouteChangeComplete = url => {
      scrollBehavior.updateScroll()
    }
    // Do once on init for reload
    // TODO: Run only reload
    scrollBehavior.updateScroll()
  }
}
