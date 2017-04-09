import { Link, Router } from '../routes'
import applyScrollRestore from '../util/scrollBehavior'

applyScrollRestore({addTransitionHook: Router.onRouteChangeComplete})

export default function Header () {
  return <header>
   <Link href='/'><a>Index</a></Link>
   /
   <Link route='about'><a>About</a></Link>
   /
   <Link route='prefetch'><a>Prefetch</a></Link>
   /
   <Link route='async'><a>Async</a></Link>
   /
   <Link route='scroll'><a>Scroll</a></Link>
   /
   <Link route='article' params={{id: 0}}><a>Arcticle:0</a></Link>
   <hr/>
  </header>
}
