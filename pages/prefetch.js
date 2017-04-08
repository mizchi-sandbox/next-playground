import Link from 'next/link'
import Header from '../components/Header'

export default class Prefetch extends React.Component {
  render() {
    return <div>
      <Header/>
      <Link href='/async' prefetch><a>To Async with prefetch</a></Link>
    </div>
  }
}
