import Link from 'next/link'
import Header from '../components/Header'

export default class Async extends React.Component {
  static async getInitialProps() {
    console.log('getInitialProps on Async')
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const data = await res.json()
    return data
  }

  render() {
    return <div>
      <Header/>
      Welcome to next.js! {this.props.stargazers_count}
      <div>Hello World. <Link href='/about'><a>About</a></Link></div>
    </div>

  }
}
