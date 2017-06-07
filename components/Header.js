import { Link, Router } from '../routes'

export default function Header() {
  return (
    <header>
      <Link href="/"><a>Index</a></Link>
      /
      <Link route="article" params={{ id: 0 }}><a>Arcticle:0</a></Link>
      /
      <Link route="article" params={{ id: 1 }}><a>Arcticle:1</a></Link>
      /
      <Link route="redux"><a>Redux</a></Link>
      <hr />
    </header>
  )
}
