import Link from 'next/link'
import Router from 'next/router'
// import createScrollBehavior from '../util/scrollBehavior'
import applyScrollRestore from '../util/scrollBehavior'

applyScrollRestore({addTransitionHook: Router.onRouteChangeComplete})

export default function Header () {
  return <header>
   <Link href='/'><a>Index</a></Link>
   /
   <Link href='/about'><a>About</a></Link>
   /
   <Link href='/prefetch'><a>Prefetch</a></Link>
   /
   <Link href='/async'><a>Async</a></Link>
   /
   <Link href='/scroll'><a>Scroll</a></Link>
   <hr/>
  </header>
}
