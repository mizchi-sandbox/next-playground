import Link from 'next/link'
export default function Header () {
  return <header>
   <Link href='/'><a>Index</a></Link>
   /
   <Link href='/about'><a>About</a></Link>
   <hr/>
  </header>
}
